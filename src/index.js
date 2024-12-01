import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import './styles/index.css'; // Verify the path to your CSS file

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Please ensure your index.html file contains a <div id='root'></div>.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>
);
