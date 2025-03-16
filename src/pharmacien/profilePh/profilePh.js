import React, { useEffect, useState } from 'react';
import './profilePh.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Mapsph from '../mapsph/mapsph'; // استيراد المكون الخاص بالخريطة

function Profile() {
  const navigate = useNavigate();

  // الحالة لتخزين بيانات المستخدم
  const [user, setUser] = useState({
    username: '',
    email: '',
    telephone: '',
    id: '',
    latitude: '',
    longitude: '',
    nomPharmacie: ''
  });

  // حالة فتح وإغلاق modal
  const [showModal, setShowModal] = useState(false);

  // جلب البيانات من localStorage عند تحميل الصفحة
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      setUser(userData);
    }
  }, []);

  // تحديث الحقول عند التغيير
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // دالة لتحديث القيم القادمة من Mapsph
  const updateCoordinates = (latitude, longitude) => {
    setUser((prevState) => ({
      ...prevState,
      latitude,
      longitude
    }));
    setShowModal(false); // إغلاق modal بعد تحديث القيم
  };

  // تحديث البيانات في السيرفر
  const update = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/web2/api/pharmacien/${user.id}`,
        user
      );
      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/pharmacien/ordonnancePh');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profilePh">
      <h2>Profile Details</h2>
      <div>
        <strong>ID:</strong> <span>{user.id}</span>
      </div>
      <div>
        <strong>Username:</strong>
        <input
          className="inputprPh"
          type="text"
          name="username"
          value={user.username || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <strong>Email:</strong>
        <input
          className="inputprPh"
          type="email"
          name="email"
          value={user.email || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <strong>Telephone:</strong>
        <input
          className="inputprPh"
          type="tel"
          name="telephone"
          value={user.telephone || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <strong>Nom de pharmacie:</strong>
        <input
          className="inputprPh"
          type="text"
          name="nomPharmacie"
          value={user.nomPharmacie || ''}
          onChange={handleChange}
        />
      </div>
      <div className="position">
        <strong>Latitude:</strong>
        <input
          className="inputprPh"
          type="text"
          name="latitude"
          value={user.latitude || ''}
          onChange={handleChange}
        />
        <strong>Longitude:</strong>
        <input
          className="inputprPh"
          type="text"
          name="longitude"
          value={user.longitude || ''}
          onChange={handleChange}
        />
      </div>
      <a href="#" onClick={() => setShowModal(true)}>
        je ne sais pas mon position
      </a>
      <button className="btPh" onClick={update}>
        Save Changes
      </button>
      <p>Veuillez continuer à saisir les données pour devenir partenaire</p>

      {showModal && (
  <div className="modal">
    <div className="modal-content">
      <Mapsph 
        updateCoordinates={updateCoordinates} 
        closeModal={() => setShowModal(false)} // تمرير دالة الإغلاق
      />
    </div>
  </div>
)}

    </div>
  );
}

export default Profile;
