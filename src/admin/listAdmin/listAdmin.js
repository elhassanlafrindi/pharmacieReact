import React, { useCallback, useEffect, useState } from 'react';
import plus from './new.png'
import { NavLink, useNavigate } from 'react-router-dom';
import SearchComponent from './search'
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import './listAdmin.css';
import axios from 'axios';
export default function List(){
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
          `http://localhost:8080/web2/api/admin/${userData.id}/notifications/unseen`
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
        `http://localhost:8080/web2/api/admin/${userData.id}/notifications/mark-as-seen`
      );
      navigate('/admin/notificationAdmin');
      if (response.data.updated > 0) {
        
        
        setNb(0); 
        
      } else {
        console.log("No notifications were updated.");
      }
     

     

    } catch (error) {
      console.error("Erreur lors de la mise à jour des notifications :", error);
    }

  }
    return(
        <>
        <header>
        <div className='containerAdmin container-flexAdmin'>
        <div className='logContainerAdmin'>
          <img src={plus} alt="pharm" className='logoAdmin' />
        </div>
        <nav>
          <div className='listAdmin'>
            <NavLink to="/admin/homeAdmin"  className={({ isActive }) => isActive ? 'listItemAdmin activeItemAdmin' : 'listItemAdmin'}>Home</NavLink>
            <NavLink to="/admin/profileAdmin"  className={({ isActive }) => isActive ? 'listItemAdmin activeItemAdmin' : 'listItemAdmin'}>Profile</NavLink>
            <NavLink to="/admin/pharmacies"  className={({ isActive }) => isActive ? 'listItemAdmin activeItemAdmin' : 'listItemAdmin'}>Pharmacies</NavLink>
            <NavLink to="/admin/users"  className={({ isActive }) => isActive ? 'listItemAdmin activeItemAdmin' : 'listItemAdmin'}>Users</NavLink>
            <NavLink to="/admin/mapsAdmin"  className={({ isActive }) => isActive ? 'listItemAdmin activeItemAdmin' : 'listItemAdmin'}>Maps</NavLink>


          </div>
        </nav>
        <div className="iconsAdmin">
           
          <button onClick={seen} className="menuAd-btn">
          
               <NotificationsIcon className="iconAdmin" />{nb > 0 && <span className="notificationAd-count">{nb}</span>}
    
          </button>
          
          
          <NavLink to="/connection">
               <LogoutIcon className="iconAdmin" />
          </NavLink>
        </div>
      </div>
        </header>
        </>
        
    )
}