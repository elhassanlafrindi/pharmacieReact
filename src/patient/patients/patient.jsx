import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { FaBars } from 'react-icons/fa';
import { IoIosNotifications } from "react-icons/io";
import Maps from '../maps2/maps2';
import Prescription from '../sendOrdonnace/Prescription';
import './patient.css';
import Dashboard from '../historique/historique';
import ForgotPass from '../forgotPassword/forgotPass';
import Profile from '../profile/profile';
import { useNavigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Notification from '../notification/notification';

function Patient({ state }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem('userData');
    console.log(data.nom);
    return data ? JSON.parse(data) : null;
  });
  
  const [nb, setNb] = useState();
  const navigate = useNavigate();

  const fetchNotifications = useCallback(async () => {
    if (userData && userData.id) {
      try {
        const response = await axios.get(
          `http://localhost:8080/web2/api/patient/${userData.id}/notifications/unseen`
        );
        if (response.data && response.data.size >= 0) {
          setNb(response.data.size); 
          console.log("Updated Notification Count:", response.data.size);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des notifications :", error);
      }
    } else {
      console.log("Utilisateur non connecté");
    }
  }, [userData]);
  
  useEffect(() => {
    let isMounted = true;
    
    if (isMounted && userData && userData.id) {
      console.log("Fetching notifications for user:", userData.id);
      fetchNotifications();
    }
    const interval = setInterval(() => {
      fetchNotifications();
    }, 2000);
  
    return () => {
      isMounted = false; 
      clearInterval(interval);
    };
  }, [userData, fetchNotifications]);
  
    
    const seen= async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          `http://localhost:8080/web2/api/patient/${userData.id}/notifications/mark-as-seen`
        );
        navigate('/patient/notification');
        if (response.data.updated > 0) {
          
          
          setNb(0); 
          
        } else {
          console.log("No notifications were updated.");
        }
       

       

      } catch (error) {
        console.error("Erreur lors de la mise à jour des notifications :", error);
      }

    }
  return (
    <div className="main">
      <div className="butonat">
        <button onClick={toggleSidebar} className="menubar-btn">
          <FaBars size={20} color="#fff" />
        </button>
        <button onClick={seen} className="menu1-btn">
  <IoIosNotifications size={20} color="#fff" />
  {nb > 0 && <span className="notification-count">{nb}</span>}
</button>


      </div>

      {isSidebarVisible && <Sidebar />}

      <div className="containerp">
        <Routes>
          <Route path="/maps2" element={<Maps />} />
          <Route path="/historique" element={<Dashboard />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/profile" element={<Profile userData={userData} />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default Patient;
