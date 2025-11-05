
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GalleryPage from "./pages/Gallery";
import Contacto from "./pages/Contacto";
import PrivateGallery from "./pages/PrivateGallery";


function App() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/galeria" element={<GalleryPage />} />
  <Route path="/contacto" element={<Contacto />} />
  <Route path="/privada" element={<PrivateGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
