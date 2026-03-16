import { createContext, useContext, useState, useEffect } from "react";

const DeckContext = createContext();

export function DeckProvider({ children }) {
  const maxDeckSize = 10;

  const [deck, setDeck] = useState(() => {
    const saved = localStorage.getItem("deck");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("deck", JSON.stringify(deck));
  }, [deck]);

  const toggleDeck = (politician) => {
    setDeck((prev) => {
      const exists = prev.some((p) => p.slug === politician.slug);

      if (exists) return prev.filter((p) => p.slug !== politician.slug);

      return [...prev, politician];
    });
  };

  const isInDeck = (slug) => deck.some((p) => p.slug === slug);

  const removeFromDeck = (slug) => {
    setDeck((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <DeckContext.Provider
      value={{ deck, toggleDeck, removeFromDeck, isInDeck, maxDeckSize }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDeck() {
  return useContext(DeckContext);
}
