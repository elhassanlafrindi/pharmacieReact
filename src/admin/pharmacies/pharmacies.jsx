import React, { useEffect, useState } from "react";
import "./pharmacies.css";
import axios from "axios";

const CartPharmacie = () => {
  const [statut, setStatut] = useState();
const [base, setBase] = useState();
  
  const [selectedStatut, setSelectedStatut] = useState("all");

 const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  });
  const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8080/web2/api/admin/consulterPharmacies'
        );
        console.log("Response from API:", response.data); 
        setBase(response.data);


        if (response.data) {
          setTableData(response.data); 
        }
      } catch (error) {
        alert("error de porter les données");
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchOrderHistory();
    }
  }, [userData?.id]);
  

  
  
 
  
  const handleMesAjour = async (id, statut) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/web2/api/admin/pharmacie/${id}/updateStatut`,
        new URLSearchParams({
          statut: statut,
        })
      );
  
      if (response.status === 200) {
        alert("Le statut a été mis à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Une erreur s'est produite lors de la mise à jour de la commande.");
    }
  };
  

const handleStatusChange = (id, newStatus) => {
  setTableData((prevData) =>
    prevData.map((row) =>
      row.id === id ? { ...row, statutPharmacie: newStatus } : row
    )
  );
};

const handleFilter = async () => {
    if (selectedStatut === "all") {
      setTableData(base);
    } else if (selectedStatut === "Actif") {
      try {
        const response = await axios.get(
          `http://localhost:8080/web2/api/admin/consulterPharmaciesByStatus/${selectedStatut}`
        );
        if (response.status === 200 && response.data) {
          setTableData(response.data); 
        }
      } catch (error) {
        console.error("Erreur lors du chargement des pharmaciens :", error);
        alert("Erreur : Impossible de récupérer les données des pharmaciens.");
      }
    } else if (selectedStatut === "Non_Actif") {
      try {
        const response = await axios.get(
            `http://localhost:8080/web2/api/admin/consulterPharmaciesByStatus/${selectedStatut}`
        );
        if (response.status === 200 && response.data) {
          setTableData(response.data); 
        }
      } catch (error) {
        console.error("Erreur lors du chargement des patients :", error);
        alert("Erreur : Impossible de récupérer les données des patients.");
      }
    }
  };



  return (
    <div className="kok">
      
      <h2 className="h2adm">Pharmacies</h2>
      <div className="radio-groupadm">
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


      <table>
        <thead>
          <tr>
            <th>Pharmacie</th>
            <th>email</th>
            <th>telephone</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ?  (
            tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.nomPharmacie}</td>
                <td>{row.email}</td>
                <td>{row.telephone}</td>

                <td>
                <select
  value={row.statutPharmacie}
  onChange={(e) => handleStatusChange(row.id, e.target.value)}
>
  <option value="Actif">actif</option>
  <option value="Non_Actif">non actif</option>
</select>

                </td>
                <td>
                  <button
  onClick={() => handleMesAjour(row.id,row.statutPharmacie)}
  style={{ marginLeft: "10px" }}
>
  Mise à jour
</button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune donnée disponible</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  );
};

export default CartPharmacie;
