import PropTypes from 'prop-types';
import React from 'react';
import './styles/Sidebar.css';

const Sidebar = ({
  clients,
  language,
  setLanguage,
  theme,
  setTheme,
  onCopyRoomId,
  onLeaveRoom,
}) => {
  // Ensure unique clients
  const uniqueClients = Array.from(
    new Map(clients.map((client) => [client.socketId, client])).values()
  );

  return (
    <div className="sidebar">
      <h2>CodeNest</h2>
      <h3>Participants</h3>
      <ul className="client-list">
        {uniqueClients.length > 0 ? (
          uniqueClients.map((client) => (
            <li key={client.socketId}>{client.username}</li>
          ))
        ) : (
          <li>No users connected</li>
        )}
      </ul>
      <div className="settings">
        <label>
          Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
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
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
            <option value="sass">Sass</option>
            <option value="shell">Shell</option>
            <option value="sql">SQL</option>
            <option value="swift">Swift</option>
            <option value="xml">XML</option>
            <option value="yaml">YAML</option>
          </select>
        </label>
        <label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
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
            <option value="colorforth">colorforth</option>
            <option value="darcula">darcula</option>
            <option value="dracula">dracula</option>
            <option value="duotone-dark">duotone-dark</option>
            <option value="duotone-light">duotone-light</option>
            <option value="eclipse">eclipse</option>
            <option value="elegant">elegant</option>
            <option value="erlang-dark">erlang-dark</option>
            <option value="gruvbox-dark">gruvbox-dark</option>
            <option value="hopscotch">hopscotch</option>
            <option value="icecoder">icecoder</option>
            <option value="idea">idea</option>
            <option value="isotope">isotope</option>
            <option value="juejin">juejin</option>
            <option value="lesser-dark">lesser-dark</option>
            <option value="liquibyte">liquibyte</option>
            <option value="lucario">lucario</option>
            <option value="material">material</option>
            <option value="material-darker">material-darker</option>
            <option value="material-ocean">material-ocean</option>
            <option value="material-palenight">material-palenight</option>
            <option value="mbo">mbo</option>
            <option value="mdn-like">mdn-like</option>
            <option value="midnight">midnight</option>
            <option value="monokai">monokai</option>
            <option value="moxer">moxer</option>
            <option value="neat">neat</option>
            <option value="neo">neo</option>
            <option value="night">night</option>
            <option value="nord">nord</option>
            <option value="oceanic-next">oceanic-next</option>
            <option value="panda-syntax">panda-syntax</option>
            <option value="paraiso-dark">paraiso-dark</option>
            <option value="paraiso-light">paraiso-light</option>
            <option value="pastel-on-dark">pastel-on-dark</option>
            <option value="railscasts">railscasts</option>
            <option value="rubyblue">rubyblue</option>
            <option value="seti">seti</option>
            <option value="shadowfox">shadowfox</option>
            <option value="solarized">solarized</option>
            <option value="the-matrix">the-matrix</option>
            <option value="tomorrow-night-bright">tomorrow-night-bright</option>
            <option value="tomorrow-night-eighties">tomorrow-night-eighties</option>
            <option value="ttcn">ttcn</option>
            <option value="twilight">twilight</option>
            <option value="vibrant-ink">vibrant-ink</option>
            <option value="xq-dark">xq-dark</option>
            <option value="xq-light">xq-light</option>
            <option value="yeti">yeti</option>
            <option value="yonce">yonce</option>
            <option value="zenburn">zenburn</option>
          </select>
        </label>
      </div>
      <button onClick={onCopyRoomId}>Copy Room ID</button>
      <button onClick={onLeaveRoom}>Leave Room</button>
    </div>
  );
};

// Prop type validation
Sidebar.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      socketId: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  onCopyRoomId: PropTypes.func.isRequired,
  onLeaveRoom: PropTypes.func.isRequired,
};

export default Sidebar;
