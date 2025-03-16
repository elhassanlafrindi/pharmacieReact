import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";
import L from "leaflet";
import location from '../images/searchloc.png';
import searchIcon from '../images/location.png';
import SearchLocation from './searchLocation';

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

const UserMapWithDirections = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [searchPosition, setSearchPosition] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Position actuelle de l'utilisateur :", latitude, longitude);  
          setUserPosition([latitude, longitude]);
          fetchPharmacies(latitude, longitude).then((pharmacyData) => {
            setPharmacies(pharmacyData);
          });
        },
        (error) => {
          console.error("Erreur lors de la détermination de la position :", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Vous n'avez pas autorisé l'accès à la position.");
          }
        },
        { enableHighAccuracy: true } 
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      alert("Le navigateur ne prend pas en charge la géolocalisation.");
    }
  }, []);

  const handlePharmacyClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleSendPrescription = () => {
    alert("Veuillez vous connecter pour envoyer une ordonnance.");
  };

  const renderPharmacyPopup = (pharmacy) => {
    const name = pharmacy.tags.name || "Pharmacie";
    const address = pharmacy.tags['addr:street'] || pharmacy.tags['addr:city'] || "Adresse non disponible";
    const phone = pharmacy.tags['contact:phone'] || "Numéro de téléphone non disponible";
    const status = pharmacy.tags['healthcare:status'] || "Inconnu";

    return (
      <div>
        <strong>{name}</strong>
        <br />
        <p><strong>Adresse: </strong>{address}</p>
        <p><strong>Téléphone: </strong>{phone}</p>
        <p><strong>Statut: </strong>{status}</p>
        <button onClick={handleSendPrescription}>Envoyer l'ordonnance</button>
      </div>
    );
  };

  return (
    <div style={{ height:"550px", padding: "20px", backgroundColor:"#a5f0df" }}>
      <SearchLocation setCoordinates={setSearchPosition} />
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

          {pharmacies.map((pharmacy, index) => (
            <Marker
              key={index}
              position={[pharmacy.lat, pharmacy.lon]}
              icon={searchLocationIcon}
              eventHandlers={{
                click: () => handlePharmacyClick(pharmacy)
              }}
            >
              <Popup>{renderPharmacyPopup(pharmacy)}</Popup>
            </Marker>
          ))}

          {searchPosition && (
            <Marker position={searchPosition} icon={searchLocationIcon}>
              <Popup>Position recherchée</Popup>
            </Marker>
          )}

          <RoutingControl
            userPosition={userPosition}
            searchPosition={searchPosition}
          />
          <MaxBounds userPosition={userPosition} />
        </MapContainer>
      ) : (
        <p>Localisation en cours... <span>Veuillez patienter...</span></p>
      )}
    </div>
  );
};

const RoutingControl = ({ userPosition, searchPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (userPosition && searchPosition && map) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userPosition[0], userPosition[1]),
          L.latLng(searchPosition[0], searchPosition[1]),
        ],
        routeWhileDragging: true,
        createMarker: function () {
          return null;
        },
        showAlternatives: false,
        directions: false,
      }).addTo(map);

      return () => {
        if (routingControl && map) {
          try {
            map.removeControl(routingControl);
          } catch (error) {
            console.warn("Impossible de retirer le contrôle de la direction :", error);
          }
        }
      };
    }
  }, [userPosition, searchPosition, map]);

  return null;
};

const MaxBounds = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      const radiusInMeters = 100000;
      const latLng = L.latLng(userPosition[0], userPosition[1]);
      const bounds = latLng.toBounds(radiusInMeters);

      map.setMaxBounds(bounds);
      map.setZoom(13);
    }
  }, [userPosition, map]);

  return null;
};

export default UserMapWithDirections;
