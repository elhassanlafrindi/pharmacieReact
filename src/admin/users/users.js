import React, { useEffect, useState } from "react";
import "./users.css";
import SearchComponent from "../search/search";
import axios from "axios";

const Users = () => {
  const [selectedStatut, setSelectedStatut] = useState("all");
  const [base, setBase] = useState();

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
          `http://localhost:8080/web2/api/admin/consulterUtilisateurs`
        );
        console.log("Response from API:", response.data);
        setBase(response.data);

        if (response.data) {
          setTableData(response.data);
          console.log(response.data);
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
  //-----------------------------------------

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/web2/api/admin/delete/${id}`
      );
      if (response.status === 200 || response.status === 204) {
        setTableData((prevData) => prevData.filter((row) => row.id !== id));
      } else {
        console.error("Unexpected response:", response);
        alert("Erreur lors de la suppression de l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  //------------------------------------

  //-------------------------
  const handleFilter = async () => {
    if (selectedStatut === "all") {
      // Afficher toutes les données
      setTableData(base);
    } else if (selectedStatut === "PHARMACIEN") {
      try {
        const response = await axios.get(
          "http://localhost:8080/web2/api/admin/consulterPharmacies"
        );
        if (response.status === 200 && response.data) {
          setTableData(response.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des pharmaciens :", error);
        alert("Erreur : Impossible de récupérer les données des pharmaciens.");
      }
    } else if (selectedStatut === "PATIENT") {
      try {
        const response = await axios.get(
          "http://localhost:8080/web2/api/admin/consulterPatients"
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

  const isDeletable = (id) => id !== 1;
  //---------------------
  return (
    <div className="kolchi">
      <SearchComponent />
      <h2 className="h2ad">Users</h2>
      <div className="radio-groupad">
        <label>
          <input
            type="radio"
            name="user_type"
            value="all"
            checked={selectedStatut === "all"}
            onChange={(e) => setSelectedStatut(e.target.value)}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="user_type"
            value="PHARMACIEN"
            checked={selectedStatut === "PHARMACIEN"}
            onChange={(e) => setSelectedStatut(e.target.value)}
          />
          pharmaciens
        </label>
        <label>
          <input
            type="radio"
            name="user_type"
            value="PATIENT"
            checked={selectedStatut === "PATIENT"}
            onChange={(e) => setSelectedStatut(e.target.value)}
          />
          Patient
        </label>
        <button onClick={() => handleFilter()}>Show</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>user type</th>
            <th>username</th>
            <th>email</th>
            <th>telephone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  {row.latitude != null && row.id != 1
                    ? "PHARMACIEN"
                    : row.latitude == null && row.id != 1
                    ? "PATIENT"
                    : row.id === 1
                    ? "ADMIN"
                    : ""}
                </td>
                <td>{row.username}</td>
                <td>{row.email}</td>
                <td>{row.telephone}</td>

                <td>
                  {isDeletable(row.id) && (
                    <button onClick={() => handleDelete(row.id)}>
                      Supprimer
                    </button>
                  )}
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

export default Users;
