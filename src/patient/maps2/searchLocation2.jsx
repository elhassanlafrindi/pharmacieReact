import React, { useState } from "react";
import axios from "axios";
import './maps2.css'

const SearchLocation = ({ setCoordinates, setPharmacies }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/web2/api/patient/pharmacies/map/search`, 
        {
          params: {
            name: query,
            status: "Actif"  
          }
        }
      );
      if (response.data.length > 0) {
        setPharmacies(response.data); 
      } else {
        alert("Aucune pharmacie trouvée !");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche des pharmacies :", error);
      alert("Une erreur est survenue lors de la recherche des pharmacies.");
    }
  };

  return (
    <div className='searchContainer'>
      <input
        type="text"
        placeholder="Rechercher une pharmacie..."
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
