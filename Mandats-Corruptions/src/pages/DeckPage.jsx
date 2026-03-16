import Headbar from "../components/Headbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import PoliticianCard from "../components/PoliticianCard";
import { useDeck } from "../context/DeckContext";

export default function DeckPage() {
  const { deck, removeFromDeck, maxDeckSize } = useDeck();

  return (
    <>
      <Headbar title={`Votre deck (${deck.length}/${maxDeckSize})`} />

      <Box sx={{ p: 2 }}>
        {deck.length === 0 ? (
          <Typography variant="body1">Votre deck est vide.</Typography>
        ) : (
          <List>
            {deck.map((politician) => (
              <ListItem key={politician.slug} disablePadding>
                <PoliticianCard
                  data={politician}
                  isChecked={true}
                  onCardClick={() => removeFromDeck(politician.slug)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  );
}
