import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";

import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import FightPage from "./pages/FightPage";
import DeckPage from "./pages/DeckPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ pb: 7 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/combat" element={<FightPage />} />
          <Route path="/deck" element={<DeckPage />} />
        </Routes>
      </Box>

      <Navbar />
    </BrowserRouter>
  );
}

export default App;
