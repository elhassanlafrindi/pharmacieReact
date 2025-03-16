import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";
import L from "leaflet";
import location from './searchloc.png';
import searchIcon from './location.png';
import SearchLocation from './searchLocation';
import "./mapsph.css";

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

const fetchPharmacies = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://overpass-api.de/api/interpreter?data=[out:json];node(around:1500,${lat},${lon})[amenity=pharmacy];out;`
    );
    return response.data.elements;
  } catch (error) {
    console.error("Erreur lors de la récupération des pharmacies :", error);
    return [];
  }
};

const UserMapWithDirections = ({ updateCoordinates, closeModal }) => {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => console.error("Erreur de localisation:", error)
      );
    }
  }, []);

  const handleConfirmLocation = () => {
    if (userPosition) {
      updateCoordinates(userPosition[0], userPosition[1]); 
    }
  };

  return (
    <div style={{ height: "550px", padding: "20px", backgroundColor: "#a5f0df" }}>
      {userPosition ? (
        <MapContainer center={userPosition} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={userPosition} icon={userIcon}>
            <Popup>Votre position actuelle</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Localisation en cours...</p>
      )}
      <div className="modal-buttons">
        <button onClick={closeModal} className="cancel-location-btn">
          Annuler
        </button>
        <button onClick={handleConfirmLocation} className="confirm-location-btn">
          Confirm Location
        </button>
      </div>
    </div>
  );
};

export default UserMapWithDirections;
