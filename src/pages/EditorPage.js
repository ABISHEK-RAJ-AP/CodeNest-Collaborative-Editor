import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ACTIONS from '../actions/Actions';
import { cmtheme, language } from '../atoms/atoms';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../initSocket';
import '../styles/EditorPage.css';

const EditorPage = () => {
  const [clients, setClients] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(language);
  const [selectedTheme, setSelectedTheme] = useRecoilState(cmtheme);
  const socketRef = useRef(null);
  const codeRef = useRef(''); // Keeps the current code in sync
  const editorRef = useRef(null); // Reference to the Editor component
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        // Initialize the socket connection
        socketRef.current = await initSocket();

        // Handle connection errors
        socketRef.current.on('connect_error', handleError);
        socketRef.current.on('connect_failed', handleError);

        // Emit the JOIN action to connect to a room
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username || 'Anonymous',
        });

        // Listen for the JOINED action and update the list of connected clients
        socketRef.current.on(ACTIONS.JOINED, ({ clients: joinedClients }) => {
          setClients((prev) =>
            Array.from(new Map([...prev, ...joinedClients].map((c) => [c.socketId, c])).values())
          );
          if (editorRef.current && codeRef.current) {
            socketRef.current.emit(ACTIONS.SYNC_CODE, { code: codeRef.current });
          }
        });

        // Handle disconnections
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId }) => {
          setClients((prev) => prev.filter((client) => client.socketId !== socketId));
        });

        // Sync code changes
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
          if (code !== codeRef.current) {
            codeRef.current = code;
            if (editorRef.current) {
              editorRef.current.setValue(code);
            }
          }
        });

        // Sync the initial code for new users
        socketRef.current.on(ACTIONS.SYNC_CODE, ({ code }) => {
          if (editorRef.current) {
            editorRef.current.setValue(code);
          }
        });
      } catch (err) {
        console.error('Socket initialization failed:', err);
        handleError();
      }
    };

    const handleError = () => {
      toast.error('Socket connection failed. Redirecting to home.');
      navigate('/');
    };

    initializeSocket();

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.off(ACTIONS.CODE_CHANGE);
        socketRef.current.off(ACTIONS.SYNC_CODE);
      }
    };
  }, [roomId, location.state?.username, navigate]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy Room ID.');
    }
  };

  const leaveRoom = () => {
    navigate('/');
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="editorPage">
      <aside className="sidebar">
        <div className="sidebarHeader">
          <img className="sidebarLogo" src="/logo.png" alt="CodeNest Logo" />
          <h3>Connected Users</h3>
        </div>
        <div className="clientList">
          {clients.length > 0 ? (
            clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))
          ) : (
            <p>Loading users...</p>
          )}
        </div>
        <div className="controls">
          <label>
            Select Language:
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="dropdown"
            >
              <option value="clike">C / C++ / C# / Java</option>
              <option value="css">CSS</option>
              <option value="dart">Dart</option>
              <option value="django">Django</option>
              <option value="dockerfile">Dockerfile</option>
              <option value="go">Go</option>
              <option value="htmlmixed">HTML-mixed</option>
              <option value="javascript">JavaScript</option>
              <option value="jsx">JSX</option>
              <option value="markdown">Markdown</option>
              <option value="php">PHP</option>
              <option value="python">Python</option>
              <option value="r">R</option>
              <option value="rust">Rust</option>
              <option value="ruby">Ruby</option>
              <option value="sass">Sass</option>
              <option value="shell">Shell</option>
              <option value="sql">SQL</option>
              <option value="swift">Swift</option>
              <option value="xml">XML</option>
              <option value="yaml">YAML</option>
            </select>
          </label>
          <label>
            Select Theme:
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="dropdown"
            >
              <option value="3024-day">3024-day</option>
              <option value="3024-night">3024-night</option>
              <option value="abbott">abbott</option>
              <option value="abcdef">abcdef</option>
              <option value="ambiance">ambiance</option>
              <option value="ayu-dark">ayu-dark</option>
              <option value="ayu-mirage">ayu-mirage</option>
              <option value="base16-dark">base16-dark</option>
              <option value="base16-light">base16-light</option>
              <option value="bespin">bespin</option>
              <option value="blackboard">blackboard</option>
              <option value="cobalt">cobalt</option>
              <option value="darcula">darcula</option>
              <option value="dracula">dracula</option>
              <option value="duotone-dark">duotone-dark</option>
              <option value="duotone-light">duotone-light</option>
              <option value="eclipse">eclipse</option>
              <option value="elegant">elegant</option>
              <option value="gruvbox-dark">gruvbox-dark</option>
              <option value="material">material</option>
              <option value="material-darker">material-darker</option>
              <option value="monokai">monokai</option>
              <option value="nord">nord</option>
              <option value="twilight">twilight</option>
            </select>
          </label>
          <button className="btn copyBtn" onClick={copyRoomId}>
            Copy Room ID
          </button>
          <button className="btn leaveBtn" onClick={leaveRoom}>
            Leave Room
          </button>
        </div>
      </aside>
      <main className="editorContainer">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
            socketRef.current.emit(ACTIONS.CODE_CHANGE, { code });
          }}
        />
      </main>
    </div>
  );
};

export default EditorPage;
