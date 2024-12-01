import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import Home from './pages/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home page route */}
                <Route path="/" element={<Home />} />
                
                {/* Editor page route with roomId parameter */}
                <Route path="/editor/:roomId" element={<EditorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
