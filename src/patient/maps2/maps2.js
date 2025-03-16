import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";
import L from "leaflet";
import location from '../images/searchloc.png';
import searchIcon from '../images/location.png';
import SearchLocation from './searchLocation2';
import { useNavigate } from 'react-router-dom';

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

const fetchPharmacies = async () => {
  try {
    const response = await axios.get('http://localhost:8080/web2/api/patient/pharmacies/map');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des pharmacies :", error);
    return [];
  }
};

const UserMapWithDirections = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [searchPosition, setSearchPosition] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          fetchPharmacies().then((pharmacyData) => {
            console.log("الصيدليات المسترجعة:", pharmacyData);
            setPharmacies(pharmacyData);
          });
        },
        (error) => {
          console.error("Erreur lors de la localisation :", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Vous n'avez pas accordé la permission d'accéder à votre position.");
          }
        }
      );
    } else {
      alert("Votre navigateur ne prend pas en charge les services de localisation.");
    }
  }, []);

  const handleSendPrescription = (pharmacy) => {
    console.log("Data sent to Prescription:", {
      idPharmacien: pharmacy.id,
      pharmacyName: pharmacy.pharmacyName,
      email: pharmacy.email,
      tele: pharmacy.tele,
    });
    navigate("/patient/prescription", {
      state: {
        idPharmacien: pharmacy.id,
        pharmacyName: pharmacy.pharmacyName,
        email: pharmacy.email,
        tele: pharmacy.tele,
      },
    });
  };

  const renderPharmacyPopup = (pharmacies) => {
    return (
      <div>
        <strong>{pharmacies.pharmacyName}</strong>
        <p><strong>Adresse: </strong>agadir</p>
        <p><strong>Téléphone: </strong>{pharmacies.tele}</p>
        <p><strong>Email: </strong>{pharmacies.email}</p>
        <button onClick={() => handleSendPrescription(pharmacies)}>
          Envoyer l'ordonnance
        </button>
      </div>
    );
  };

  return (
    <div style={{ height: "550px", padding: "20px" }}>
      <SearchLocation setPharmacies={setPharmacies} setCoordinates={setSearchPosition} />
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

          {pharmacies.length > 0 ? (
            pharmacies.map((pharmacy, index) => {
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
            })
          ) : (
            <p>Aucune pharmacies proches </p>
          )}

          {searchPosition && (
            <Marker position={searchPosition} icon={searchLocationIcon}>
              <Popup>Position recherchée</Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <p>Localisation en cours... <span>Veuillez patienter...</span></p>
      )}
    </div>
  );
};

export default UserMapWithDirections;
