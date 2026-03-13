import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Headbar({ title }) {
  return (
    <>
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
