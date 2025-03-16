import React, { useEffect, useState } from "react";
import "./ordonnancePh.css";
import SearchComponent from "../search/search";
import axios from "axios";

const Ordonnance = () => {
  const [statut, setStatut] = useState();
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
          `http://localhost:8080/web2/api/pharmacien/${userData?.id}/AllCommande`
        );
        console.log("Response from API:", response.data); 
        setStatut(response.data);


        if (response.data) {
          setTableData(response.data); 
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        alert("فشل في جلب البيانات من الخادم.");
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchOrderHistory();
    }
  }, [userData?.id]);
  //-----------------------------------------

  const handleAfficherOrdonnance = (ordonnance) => {
    
    alert(
      `Patient: ${ordonnance.nomPatient}\nemail: ${ordonnance.email}\ntelephone: ${ordonnance.telePatient}`
    );
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/web2/api/pharmacien/commande/delete/${id}`
      );
      if (response.status === 200) {
        setTableData((prevData) =>
          prevData.filter((row) => row.idCommande !== id)
        );
        
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression de la commande.");
    }
  };
  //------------------------------------
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };
  //------------------------------------
  const handleMesAjour = async (idCommande, statut, montant) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/web2/api/pharmacien/commande/${idCommande}/updateStatut`,
        new URLSearchParams({
          statut: statut,
          montant: montant,
        })
      );
  
      if (response.status === 200) {
        alert("Le statut et le montant ont été mis à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Une erreur s'est produite lors de la mise à jour de la commande.");
    }
  };
  
//-----------------
const handleStatusChange = (idCommande, newStatus) => {
  setTableData((prevData) =>
    prevData.map((row) =>
      row.idCommande === idCommande ? { ...row, statut: newStatus } : row
    )
  );
};
//-------------------------
const handleFilter = () => {
  if (selectedStatut === "all") {
    setTableData(statut); // عرض جميع البيانات
  } else {
    const filteredData = statut.filter((row) => row.statut === selectedStatut);
    setTableData(filteredData); // عرض البيانات المفلترة
  }
};


//---------------------
  return (
    <div>
      <SearchComponent />
      <h2 className="h2">Historique d'Ordonnances</h2>
      <div className="radio-group">
  <label>
    <input
      type="radio"
      name="statut"
      value="all"
      checked={selectedStatut === "all"}
      onChange={(e) => setSelectedStatut(e.target.value)}
    />
    All
  </label>
  <label>
    <input
      type="radio"
      name="statut"
      value="en_attente"
      checked={selectedStatut === "en_attente"}
      onChange={(e) => setSelectedStatut(e.target.value)}
    />
    en attente
  </label>
  <label>
    <input
      type="radio"
      name="statut"
      value="Recu"
      checked={selectedStatut === "Recu"}
      onChange={(e) => setSelectedStatut(e.target.value)}
    />
    Recu
  </label>
  <label>
    <input
      type="radio"
      name="statut"
      value="En_Preparation"
      checked={selectedStatut === "En_Preparation"}
      onChange={(e) => setSelectedStatut(e.target.value)}
    />
    En Preparation
  </label>
  <label>
    <input
      type="radio"
      name="statut"
      value="Prete_a_Recuperee"
      checked={selectedStatut === "Prete_a_Recuperee"}
      onChange={(e) => setSelectedStatut(e.target.value)}
    />
    Prete a Recuperee
  </label>
  <button onClick={() => handleFilter()}>Show</button>
</div>


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Photo</th>
            <th>Mountant</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ?  (
            tableData.map((row) => (
              <tr key={row.idCommande}>
                <td>{row.idCommande}</td>
                <td>{row.nomPatient}</td>
                <td>{row.image ? (
                      <img
                        src={`data:image/png;base64,${row.image}`}
                        alt="Ordonnance"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => openImageModal(row.image)} // فتح الصورة عند النقر
                      />
                    ) : (
                      <span>Aucune image</span>
                    )}</td>
                <td>
  <input
    type="text"
    value={row.mountant}
    onChange={(e) => {
      const newMountant = e.target.value;
      setTableData((prevData) =>
        prevData.map((r) =>
          r.idCommande === row.idCommande ? { ...r, mountant: newMountant } : r
        )
      );
    }}
  />
</td>

                <td>
                <select
  value={row.statut}
  onChange={(e) => handleStatusChange(row.idCommande, e.target.value)}
>
  <option value="en_attente">en attente</option>
  <option value="Recu">Recu</option>
  <option value="En_Preparation">En Preparation</option>
  <option value="Prete_a_Recuperee">Prete a Recuperee</option>
</select>

                </td>
                <td>
                  <button
                    onClick={() => handleDelete(row.idCommande)}
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleAfficherOrdonnance(row)}
                    style={{ marginLeft: "10px" }}
                  >
                     Details 
                  </button>
                  <button
  onClick={() => handleMesAjour(row.idCommande, row.statut, row.mountant)}
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
      {selectedImage && (
        <div className="modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeImageModal}>
              &times;
            </span>
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Ordonnance agrandie"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordonnance;
