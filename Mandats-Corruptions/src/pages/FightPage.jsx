import Headbar from "../components/Headbar";
import Button from "@mui/material/Button";
import { useDeck } from "../context/DeckContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function FightPage() {
  const { deck, maxDeckSize } = useDeck();

  return (
    <>
      <Headbar title="Échauffourée parlementaire" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px - 56px)",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Mandats & Corruptions
        </Typography>
        {deck.length === maxDeckSize ? (
          <>
            <Typography variant="body1" gutterBottom>
              Votre gouvernement est prêt ({deck.length}/{maxDeckSize}).
            </Typography>
            <Button variant="contained" href="#contained-buttons">
              PLAY
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Votre gouvernement n'est pas au complet ({deck.length}/
              {maxDeckSize}).
            </Typography>
            <Button variant="contained" disabled>
              PLAY
            </Button>
          </>
        )}
      </Box>
    </>
  );
}
