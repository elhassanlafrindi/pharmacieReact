import React, { useState } from 'react';
import './forg.css'; // Importation du CSS
import { useNavigate } from 'react-router-dom';

const Forg = () => {
  const [email, setEmail] = useState('');
const navigate=useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      alert("Veuillez entrer une adresse email.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/web2/api/admin/envoyerMotDePasse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email: email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || "Le mot de passe a été envoyé à votre adresse email.");
        setEmail(''); 
        navigate("/connection");
      } else {
        alert(data.error || "L'email n'a pas été trouvé.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  };
  const annuler=()=>{
    navigate("/connection");
  }
  

  return (
    <div className="forg-container">
      <form onSubmit={handleSubmit} className="forg-form">
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          className="forg-input"
          required
        />
        <button type="submit" className="forg-button"  onClick={handleSubmit}>
          Send
        </button>
        <button type="submit" className="forg-button" onClick={annuler}>
          annuler
        </button>
        
      </form>
      
    </div>
  );
};

export default Forg;
