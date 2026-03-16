import { useState, useEffect, useRef, useCallback } from "react";
import Headbar from "../components/Headbar";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useDeck } from "../context/DeckContext";

import PoligraphService from "../services/poligraphService";
import PoliticianCard from "../components/PoliticianCard";

const ariaLabel = { "aria-label": "description" };

export default function CollectionPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [politicians, setPoliticians] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { toggleDeck, isInDeck, deck, maxDeckSize } = useDeck();
  const observer = useRef();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setPoliticians([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearch]);

  useEffect(() => {
    async function loadPoliticians() {
      setLoading(true);

      const results = debouncedSearch.trim()
        ? await PoligraphService.searchPoliticiansByName(debouncedSearch, page)
        : await PoligraphService.getProminentPoliticians(page);

      setPoliticians((prev) => {
        const all = [...prev, ...results];
        return Array.from(new Map(all.map((p) => [p.slug, p])).values());
      });

      if (results.length < 20) setHasMore(false);
      setLoading(false);
    }

    loadPoliticians();
  }, [debouncedSearch, page]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleToggleDeck = (politician) => {
    if (!isInDeck(politician.slug) && deck.length >= maxDeckSize) {
      alert(`Le deck est limité à ${maxDeckSize} cartes`);
      return;
    }
    toggleDeck(politician);
  };

  return (
    <>
      <Headbar title="Collection" />
      <Box sx={{ p: 2 }}>
        <Input
          placeholder="Entrer un nom"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <List>
          {politicians.map((politician, index) => (
            <ListItem
              ref={politicians.length === index + 1 ? lastElementRef : null}
              key={politician.slug}
              disablePadding
            >
              <PoliticianCard
                data={politician}
                isChecked={isInDeck(politician.slug)}
                isFull={deck.length >= maxDeckSize}
                onCardClick={() => handleToggleDeck(politician)}
              />
            </ListItem>
          ))}
        </List>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
    </>
  );
}
