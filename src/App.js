
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Vans from './pages/Van';
import VanDetail from './pages/VanDetail';

function App() {
  return (
    <BrowserRouter>
    <header>
      <Link to="/">#VANLIFE</Link>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/vans">Vans</Link>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/vans" element={<Vans/>}/>
      <Route path="/vans/:id" element={<VanDetail/>}/>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
