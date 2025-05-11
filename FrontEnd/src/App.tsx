import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Dash from './pages/Dash';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const location = useLocation();
  const isDashPage = location.pathname === '/dash';

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dash" element={<Dash />} />
        </Routes>
      </main>
      {!isDashPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;