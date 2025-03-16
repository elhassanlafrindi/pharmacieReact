import React, { useState, useEffect } from "react";
import "./notification.css";
import SearchComponent from "../search/search";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userData2, setUserData] = useState(() => {
    const data = localStorage.getItem('userData');
    //console.log(data.nom);
    return data ? JSON.parse(data) : null;
  });


  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:8080/web2/api/patient/${userData2.id}/notifications/last-ten`);
      if (!response.ok) throw new Error("Erreur lors du chargement des notifications");

      const data = await response.json().catch(() => []);
      setNotifications(data);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/web2/api/patient/notifications/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression de la notification");

      setNotifications(notifications.filter((notification) => notification.id !== id));
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };
  

  return (
    <div>
      <SearchComponent />
      <h2 className="h2">Historique d'Ordonnances</h2>
      {loading ? (
        <p>Chargement des notifications...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email d'Expéditeur</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr key={notification.id}  className={notification.seen? "" : "unseen"}>
                  <td>{notification.user?.email || "Inconnu"}</td>
                  <td>{notification.message}</td>
                  <td>
                    <button onClick={() => deleteNotification(notification.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Aucune notification trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notification;
