import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SportsMmaIcon from "@mui/icons-material/SportsMma";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    navigate("/" + newValue);
  };

  // récupère la route actuelle
  const currentValue =
    location.pathname === "/" ? "combat" : location.pathname.replace("/", "");

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation value={currentValue} onChange={handleChange}>
        <BottomNavigationAction
          label="Collection"
          value="collection"
          icon={<ShoppingCartIcon />}
        />

        <BottomNavigationAction
          label="Play"
          value="play"
          icon={<SportsMmaIcon />}
        />

        <BottomNavigationAction
          label="Deck"
          value="deck"
          icon={<CollectionsBookmarkIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
