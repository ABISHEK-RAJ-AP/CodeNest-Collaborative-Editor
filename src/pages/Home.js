import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import '../styles/Home.css'; // Ensure this file exists

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success('Created a new room');
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('ROOM ID and Username are required!');
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img className="homePageLogo" src="/logo.png" alt="CodeNest Logo" />
        <h4 className="mainLabel">Generate a new room or join using a Room ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join Room
          </button>
          <span className="createInfo">
            If you don't have a Room ID, click{' '}
            <button onClick={createNewRoom} className="createNewBtn">
              Create New Room
            </button>
          </span>
        </div>
      </div>
      <footer>
        <p>
          Built by{' '}
          <a
            href="https://github.com/ABISHEK-RAJ-AP"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abishek Raj A P
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
