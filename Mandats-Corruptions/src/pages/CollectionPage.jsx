import { useState, useEffect } from "react";
import Headbar from "../components/Headbar";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import PoligraphService from "../services/poligraphService";

import PoliticianCard from "../components/PoliticianCard";

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
      <Box sx={{ p: 2 }}>
        <Input
          placeholder="Entrer un nom"
          inputProps={ariaLabel}
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <List>
          {politicians.map((politician) => (
            <ListItem key={politician.slug} disablePadding>
              <PoliticianCard data={politician} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
