import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./form.css";
import axios from "axios";

function Prescription() {
  const location = useLocation();
  const navigate = useNavigate();

  const { idPharmacien, pharmacyName, email, tele } = location.state || {};

  const [idPharmacienState, setIdPharmacienState] = useState(idPharmacien || "");
  const [pharmacyNameState, setPharmacyNameState] = useState(pharmacyName || "");
  const [pharmacyEmail, setPharmacyEmail] = useState(email || "");
  const [pharmacyPhone, setPharmacyPhone] = useState(tele || "");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    if (!idPharmacienState) {
      alert("Les données de la pharmacie sont manquantes !");
      navigate("/");
    }
  }, [idPharmacienState, navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };
const Annuler =(e)=>{
  e.preventDefault();
  navigate("/patient/maps2");

}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !idPharmacienState) {
      alert("Veuillez choisir un fichier et vérifier les données de la pharmacie.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("statut", "en_attente");
      formData.append("idPharmacie", idPharmacienState);

      const response = await axios.post(
        `http://localhost:8080/web2/api/patient/${userData?.id}/commande`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Commande envoyée avec succès.");
        navigate("/patient/historique");
      } else {
        alert("Erreur lors de l'envoi de la commande.");
      }
    } catch (error) {
      alert(`Échec de l'envoi : ${error.message}`);
    }
  };
  const setDeliveryMethod=(e)=>{
  }

  return (
    <div className="formula">
      <form>
        <div className="pharmacy-info">
          <h3>Prescription</h3>
          <label>Nom de la pharmacie:</label>
          <input
            className="input2"
            type="text"
            value={pharmacyNameState}
            readOnly
          />

          <label>Email de la pharmacie:</label>
          <input
            className="input2"
            type="email"
            value={pharmacyEmail}
            readOnly
          />

          <label>Téléphone de la pharmacie:</label>
          <input
            className="input2"
            type="text"
            value={pharmacyPhone}
            readOnly
          />

          <label>Upload Ordonnance:</label>
          <input
            className="input3"
            type="file"
            onChange={handleFileChange}
          />
            <h3>Méthode d'envoi:</h3>
          <label>
            <input
              type="checkbox"
              name="deliveryMethod"
              value="email"

              
              onChange={() => setDeliveryMethod("email")}
            />
            Email
          </label>

          <div className="submit-buttoni">
            <button type="button" onClick={handleSubmit}>
              Envoyer
            </button>
            <button type="button" onClick={Annuler}>
              Annuler
            </button>
          </div>
        </div>
      </form>

      {previewUrl && (
        <div className="preview-container">
          <h3>Prévisualisation:</h3>
          <img
            src={previewUrl}
            alt="Prévisualisation de l'ordonnance"
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
}

export default Prescription;
