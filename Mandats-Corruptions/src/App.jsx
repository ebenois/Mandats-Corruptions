import { useState } from "react";
import poligraphService from "./services/poligraphService";
import "./assets/firebase";

export default function App() {
  const [search, setSearch] = useState("");
  const [politicians, setPoliticians] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    const results = await poligraphService.searchPoliticiansByName(search);
    setPoliticians(results);
    setSelected(null);
    setLoading(false);
  };

  const handleSelect = async (slug) => {
    setLoading(true);
    const politician = await poligraphService.findPoliticianBySlug(slug);
    setSelected(politician);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>Test API Poligraph</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Rechercher un politicien..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

      {loading && <p>Chargement...</p>}

      {!loading && politicians.length > 0 && (
        <div>
          <h2>Résultats</h2>
          <ul>
            {politicians.map((p) => (
              <li key={p.id} style={{ marginBottom: 8 }}>
                <button onClick={() => handleSelect(p.slug)}>
                  {p.fullName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selected && (
        <div style={{ marginTop: 30 }}>
          <h2>Détails</h2>

          {selected.photoUrl && (
            <img
              src={selected.photoUrl}
              alt={selected.fullName}
              width={150}
            />
          )}

          <p><b>Nom :</b> {selected.fullName}</p>
          <p><b>Prénom :</b> {selected.firstName}</p>
          <p><b>Nom de famille :</b> {selected.lastName}</p>
          <p><b>Date de naissance :</b> {selected.birthDate}</p>
          <p><b>Lieu de naissance :</b> {selected.birthPlace}</p>
          <p>
            <b>Parti actuel :</b>{" "}
            <span style={{ color: selected.currentParty?.color }}>
              {selected.currentParty?.name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}