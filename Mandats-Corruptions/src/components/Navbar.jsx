import * as React from "react";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SportsMmaIcon from "@mui/icons-material/SportsMma";

export default function Navbar() {
  const [value, setValue] = React.useState("collection");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate("/" + newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          left:0 ,
          bgcolor: "#FFFFFF"
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Collection"
          value="collection"
          icon={<ShoppingCartIcon />}
        />

        <BottomNavigationAction
          label="Combat"
          value="combat"
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