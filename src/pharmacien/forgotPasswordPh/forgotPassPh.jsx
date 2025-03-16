import React from 'react';
import "./forgotPPh.css";
import { useState } from "react";
import {  useNavigate } from 'react-router-dom';
function ForgotPass() {
  const navigate = useNavigate();
    const [newPass, setnewPass] = useState("");
    const [confPass, setconfPass] = useState("");
const [userDataPh4, setUserData] = useState(() => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  });
  const valide = async () => {
    if (newPass !== confPass) {
        alert("Les mots de passe ne correspondent pas"); 
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/web2/api/pharmacien/${userDataPh4.id}/resetPassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword: newPass }),
        });

        let result;
        try {
            result = await response.json(); 
        } catch (e) {
            const text = await response.text(); 
            result = { message: text }; 
        }

        if (response.ok) {
            alert("Mot de passe réinitialisé avec succès!"); 
            navigate('/pharmacien/');
        } else {
            alert("Erreur " ); 
        }
    } catch (error) {
        alert("Erreur " ); 
    }
};


  

  return (
    <div className='frph' style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'}}>
      <form>
        <h2>Reset Password</h2>

        <div className="formph-containerff">
          <div className="pharmacyph-info">
            

            <label>nouvelle mot de passe:</label>
            <input
              className="inputppph"
              type="password"
              
              onChange={(e) => setnewPass(e.target.value)}
            />

            <label>confirmer mot de passe:</label>
            <input
              className="inputppph"
              type="password"
              
              onChange={(e) => setconfPass(e.target.value)}
            />
          </div>
        </div>

        <div className="submit-buttonppph">
          <button onClick={valide} type="button">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPass;
