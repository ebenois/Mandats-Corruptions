import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function Headbar({ title }) {
  return (
    <Box sx={{ pt: 6 }}>
      <Paper
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "purple",
          color: "white",
          fontFamily: "Arial",
          textAlign: "center",
        }}
        variant="outlined"
        square
      >
        <p>{title}</p>
      </Paper>
    </Box>
  );
}