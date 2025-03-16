import React, { useState, useEffect } from "react";
import axios from "axios";
import './profile.css';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem('userData');
    console.log("Loaded data from localStorage:", data); 
    return data ? JSON.parse(data) : null;
  });
  

  const [user, setUser] = useState({
    username: '',
    email: '',
    telephone: '',
    id: ''
  });

  useEffect(() => {
    if (userData) {
      console.log("Loaded userData from localStorage:", userData); 
      setUser(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };
  const navigate = useNavigate();

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/web2/api/patient/${user.id}`,
        user
        
      );
      if (response.status === 200) {
        alert("Profile updated successfully!");
        navigate('/patient/maps2');

        console.log(user);
       
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className='profile'>
      <h2>Profile Details</h2>
      <div>
        <strong>ID:</strong> <span>{user.id}</span>
      </div>
      <div>
        <strong>Username:</strong>
        <input
  className='inputpr'
  type="text"
  name="username"
  value={user.username} 
  onChange={handleChange}
/>

      </div>
      <div>
        <strong>Email:</strong>
        <input
          className='inputpr'
          type="email"
          name="email"
          value={user.email || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <strong>Telephone:</strong>
        <input
          className='inputpr'
          type="tel"
          name="telephone"
          value={user.telephone || ''}
          onChange={handleChange}
        />
      </div>
      
      <button className='bt' onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
}

export default Profile;
