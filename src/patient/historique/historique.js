import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import SearchComponent from "../search/search";

const Dashboard = () => {
  const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  });

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // لعرض حالة التحميل
  const [selectedImage, setSelectedImage] = useState(null); // لتخزين الصورة المحددة

  // جلب تاريخ الطلبات من الخادم
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/web2/api/patient/${userData?.id}/historiqueCommande`
        );
        console.log("Response from API:", response.data); // لتصحيح الأخطاء
        if (response.data) {
          setTableData(response.data); // وضع البيانات في حالة tableData
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/web2/api/patient/commande/delete/${id}`
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

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchComponent />
      <h2 className="h2">Historique des Ordonnances</h2>
      {loading ? (
        <p>encoure de chargement...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Commande</th>
              <th>Nom Pharmacie</th>
              <th>Image</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row) => (
                <tr key={row.idCommande}>
                  <td>{row.idCommande}</td>
                  <td>{row.pharmacienNom}</td>
                  <td>
                    {row.image ? (
                      <img
                        src={`data:image/png;base64,${row.image}`}
                        alt="Ordonnance"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => openImageModal(row.image)} 
                      />
                    ) : (
                      <span>Aucune image</span>
                    )}
                  </td>
                  <td>{row.statut}</td>
                  <td>
                    <button onClick={() => handleDelete(row.idCommande)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucune donnée disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {selectedImage && (
        <div className="modaliti" onClick={closeImageModal}>
          <div className="modaliti-content" onClick={(e) => e.stopPropagation()}>
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

export default Dashboard;
