import React, { useState } from "react";
import axios from "axios";

const SearchLocation = ({ setCoordinates }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordinates([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Aucun emplacement trouvé !");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche de l'emplacement :", error);
      alert("Une erreur est survenue lors de la recherche de l'emplacement.");
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Rechercher un emplacement..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "5px", marginRight: "5px" }}
      />
      <button onClick={handleSearch} style={{ padding: "5px" }}>
        Rechercher
      </button>
    </div>
  );
};

export default SearchLocation;
