import { useState, useEffect } from "react";
import Headbar from "../components/Headbar";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import PoligraphService from "../services/poligraphService";

const ariaLabel = { "aria-label": "description" };

export default function CollectionPage() {
  const [search, setSearch] = useState("");
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    async function loadPoliticians() {
      if (!search.trim()) {
        setPoliticians([]);
        return;
      }

      const results = await PoligraphService.searchPoliticiansByName(search);

      setPoliticians(results);
    }

    loadPoliticians();
  }, [search]);

  return (
    <>
      <Headbar title="Collection" />

      <Input
        placeholder="Entrer un nom"
        inputProps={ariaLabel}
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box>
        <List>
          {politicians.map((politician) => (
            <ListItem key={politician.slug} disablePadding>
              <p>{politician.fullName}</p>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
