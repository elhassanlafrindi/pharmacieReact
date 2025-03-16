import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { FaBars } from 'react-icons/fa';
import { IoIosNotifications } from "react-icons/io";
import './pharmacien.css';
import ForgotPass from '../forgotPasswordPh/forgotPassPh';
import Profile from '../profilePh/profilePh';
import { useNavigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import NotificationPh from '../notificationPh/notificationPh';
import Ordonnance from '../ordonnancePh/ordonnancePh';
import MapsPh from '../mapsph/mapsph'

function Pharmacien() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [userDataph, setUserDataph] = useState(() => {
    const data = localStorage.getItem('userData');
    console.log(data.nom);
    return data ? JSON.parse(data) : null;
  });
  
  const [nb, setNb] = useState();
  const navigate = useNavigate();

  const fetchNotifications = useCallback(async () => {
    if (userDataph && userDataph.id) {
      try {
        const response = await axios.get(
          `http://localhost:8080/web2/api/pharmacien/${userDataph.id}/notifications/unseen`
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
  }, [userDataph]);
  
  useEffect(() => {
    let isMounted = true;
    
    if (isMounted && userDataph && userDataph.id) {
      console.log("Fetching notifications for user:", userDataph.id);
      fetchNotifications();
    }
    const interval = setInterval(() => {
      fetchNotifications();
    }, 2000);
  
    return () => {
      isMounted = false; 
      clearInterval(interval);
    };
  }, [userDataph, fetchNotifications]);
  
    
    const seen= async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          `http://localhost:8080/web2/api/pharmacien/${userDataph.id}/notifications/mark-as-seen`
        );
        navigate('/pharmacien/notificationPh');
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
    <div className="main2">
      <button onClick={toggleSidebar} className="menuin-btn">
        <FaBars size={20} color="#fff" />
      </button>
      <button onClick={seen} className="menuin2-btn">
        <IoIosNotifications size={20} color="#fff" />
        {nb > 0 && <span className="notification2-count">{nb}</span>}
      </button>

      {isSidebarVisible && <Sidebar />}

      <div className="containerp2">
        <Routes>
         <Route path="/ordonnancePh" element={<Ordonnance />} />*/
          <Route path="/forgotPassPh" element={<ForgotPass />} />
          <Route path="/notificationPh" element={<NotificationPh />} />
          <Route path="/profilePh" element={<Profile />} />
          <Route path="/mapsph" element={<MapsPh />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          



          <Route
            path="/profile" 
            element={<Profile userData={userDataph} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Pharmacien;
