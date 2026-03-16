import { useState, useEffect, useRef, useCallback } from "react";
import Headbar from "../components/Headbar";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CircularProgress from "@mui/material/CircularProgress";

import PoligraphService from "../services/poligraphService";
import PoliticianCard from "../components/PoliticianCard";

const ariaLabel = { "aria-label": "description" };

export default function CollectionPage() {
  const [search, setSearch] = useState("");
  const [politicians, setPoliticians] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

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

  useEffect(() => {
    setPoliticians([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  useEffect(() => {
    async function loadPoliticians() {
      setLoading(true);

      const results = search.trim()
        ? await PoligraphService.searchPoliticiansByName(search, page)
        : await PoligraphService.getProminentPoliticians(page);

      setPoliticians((prev) => {
        const allPoliticians = [...prev, ...results];
        const uniquePoliticians = Array.from(
          new Map(allPoliticians.map((p) => [p.slug, p])).values(),
        );

        return uniquePoliticians;
      });

      if (results.length < 20) {
        setHasMore(false);
      }

      setLoading(false);
    }

    loadPoliticians();
  }, [search, page]);

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
          {politicians.map((politician, index) => {
            if (politicians.length === index + 1) {
              return (
                <ListItem
                  ref={lastElementRef}
                  key={politician.slug}
                  disablePadding
                >
                  <PoliticianCard data={politician} />
                </ListItem>
              );
            } else {
              return (
                <ListItem key={politician.slug} disablePadding>
                  <PoliticianCard data={politician} />
                </ListItem>
              );
            }
          })}
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
