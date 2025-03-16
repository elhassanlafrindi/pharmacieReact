import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProject1 from './homes/home'; 
import Patient from './patient/patients/patient'; 
import Pharmacien from './pharmacien/pharmaciens/pharmacien'; 
import Admin from './admin/adminn/admin';
const App = () => {
  
  return (
      <Router>
        <Routes>
          <Route path="/*" element={<AppProject1 />} />

          <Route path="/patient/*" element={<Patient />} />
          
          <Route path="/pharmacien/*" element={<Pharmacien />} />
          <Route path="/admin/*" element={<Admin />} />

        </Routes>
      </Router>
  );
};

export default App;
