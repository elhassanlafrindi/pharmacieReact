import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NotificationAdmin from '../notificationAdmin/notificationAdmin';
import ProfileAdmin from '../profileAdmin/profileAdmin';
import Pharmacies from "../pharmacies/pharmacies";
import HomeAdmin from '../homeAdmin/homeAdmin';
import MapsAdmin from '../mapsAdmin/mapsAdmin';
import ListAdmin from '../listAdmin/listAdmin';
import LogOutAdmin from '../../homes/connection/connection';
import Users from '../users/users';
import './admin.css';
const Admin=()=> {
  return (
    <div className="main3"> 
      <ListAdmin />
      <div className="containerp2">
      <Routes>
      <Route path="/homeAdmin" element={<HomeAdmin />} />   

        <Route path="/pharmacies" element={<Pharmacies />} />   
        <Route path="/users" element={<Users />} />   
        <Route path="/profileAdmin" element={<ProfileAdmin />} />
        <Route path="/notificationAdmin" element={<NotificationAdmin />} />
        <Route path="/mapsAdmin" element={<MapsAdmin />} />
        <Route path="/logoutAdmin" element={<LogOutAdmin />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      </div>
      </div>
    
  );
}

export default Admin;
