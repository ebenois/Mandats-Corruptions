import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";

import CollectionPage from "./pages/CollectionPage";
import FightPage from "./pages/FightPage";
import DeckPage from "./pages/DeckPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ pb: 7 }}>
        <Routes>
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/combat" element={<FightPage />} />
          <Route path="/deck" element={<DeckPage />} />

          <Route path="/" element={<Navigate to="/combat" />} />
        </Routes>
      </Box>

      <Navbar />
    </BrowserRouter>
  );
}

export default App;
