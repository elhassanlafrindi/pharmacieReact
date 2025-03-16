import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import location from './searchloc.png';
import searchIcon from './location.png';
import SearchLocation from './searchLocation2';

const userIcon = new L.Icon({
  iconUrl: location,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const searchLocationIcon = new L.Icon({
  iconUrl: searchIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const UserMapWithDirections = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [searchPosition, setSearchPosition] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedStatut, setSelectedStatut] = useState("all");

  // Fonction pour récupérer les pharmacies en fonction du statut
  const fetchPharmacies = async (status = "all") => {
    try {
      let url = "http://localhost:8080/web2/api/admin/consulterPharmacies";
      if (status !== "all") {
        url = `http://localhost:8080/web2/api/admin/consulterPharmaciesByStatus/${status}`;
      }
      const response = await axios.get(url);
      setPharmacies(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des pharmacies :", error);
      setPharmacies([]);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          fetchPharmacies(); // Charge les données par défaut
        },
        (error) => {
          console.error("Erreur de localisation :", error);
          alert("Localisation refusée par l'utilisateur.");
        }
      );
    } else {
      alert("La localisation n'est pas supportée par votre navigateur.");
    }
  }, []);

  // Fonction appelée lors du changement de statut
  const handleFilter = () => {
    fetchPharmacies(selectedStatut);
  };

  const renderPharmacyPopup = (pharmacy) => {
    return (
      <div>
        <strong>{pharmacy.pharmacyName}</strong>
        <p><strong>Nom: </strong>{pharmacy.nomPharmacie}</p>
        <p><strong>Téléphone: </strong>{pharmacy.telephone}</p>
        <p><strong>Email: </strong>{pharmacy.email}</p>
      </div>
    );
  };

  return (
    <div className="hada" style={{ height: "300px"}}>
      <SearchLocation setPharmacies={setPharmacies} setCoordinates={setSearchPosition} />
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="status"
            value="all"
            checked={selectedStatut === "all"}
            onChange={(e) => setSelectedStatut(e.target.value)}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="Actif"
            checked={selectedStatut === "Actif"}
            onChange={(e) => setSelectedStatut(e.target.value)}
          />
          Actif
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="Non_Actif"
            checked={selectedStatut === "Non_Actif"}
            onChange={(e) => setSelectedStatut(e.target.value)}
          />
          Non Actif
        </label>
        <button onClick={handleFilter}>Afficher</button>
      </div>

      {userPosition ? (
        <MapContainer
          center={userPosition}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userPosition} icon={userIcon}>
            <Popup>Votre position actuelle</Popup>
          </Marker>

          {pharmacies.map((pharmacy, index) => {
            const latitude = parseFloat(pharmacy.latitude);
            const longitude = parseFloat(pharmacy.longitude);

            if (!isNaN(latitude) && !isNaN(longitude)) {
              return (
                <Marker
                  key={index}
                  position={[latitude, longitude]}
                  icon={searchLocationIcon}
                >
                  <Popup>{renderPharmacyPopup(pharmacy)}</Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      ) : (
        <p>Localisation en cours... <span>Veuillez patienter...</span></p>
      )}
    </div>
  );
};

export default UserMapWithDirections;
