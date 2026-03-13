import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import FightPage from "./pages/FightPage";
import DeckPage from "./pages/DeckPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/combat" element={<FightPage />} />
        <Route path="/deck" element={<DeckPage />} />
      </Routes>

      <Navbar />
    </BrowserRouter>
  );
}

export default App;
