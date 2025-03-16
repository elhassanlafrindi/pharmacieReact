import React, { useState } from "react";
import * as Components from './Components';
import '../css/connection.css';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '100%',                
        padding: '2px',              
        borderRadius: '20px',        
        border: '1px solid #ff5d22', 
        fontSize: '14px',            
        backgroundColor: '#fff',
        margin:'5px'
    }),
    option: (provided) => ({
        ...provided,
        fontSize: '13px',            
        color: '#333',               
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '13px',            
    }),
};

function Connection() {
    const [role, setRole] = useState('');
    const [signIn, toggle] = React.useState(true);
    const [username, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const roleOptionsIn = [
        { value: 'patient', label: 'Patient' },
        { value: 'admin', label: 'Admin' },
        { value: 'pharmacien', label: 'Pharmacien' }
    ];

    const handleRoleChange = (selectedOption) => {
        setRole(selectedOption?.value);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        navigate('/signup', { state: { username, email, password } });
    };
    const [userData, setUserData] = useState();

    const handLognIn = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert("Veuillez entrer l'email et le mot de passe.");
            return;
        }
    
        try {
            console.log("Email:", email, "Password:", password);

            let url;
            if (role === "patient") {
                url = 'http://localhost:8080/web2/api/patient/login';
            } else if (role === "pharmacien") {
                url = 'http://localhost:8080/web2/api/pharmacien/login';
            } else if (role === "admin"){
                url = 'http://localhost:8080/web2/api/admin/login';
            }else {
                alert('Rôle inconnu. Veuillez vérifier votre rôle.');
                return; 
            }
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode: 'cors',
                body: new URLSearchParams({
                    email: email,
                    password: password,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem('userData', JSON.stringify(data));
                    setUserData(data); 
                    console.log("data:", data);
    
                    if (role === "patient") {
                        navigate('/patient/maps2', { state: { data } });
                    } else if (role === "pharmacien" ) {
                        if(data.latitude!==null && data.latitude!==0)
                            navigate('/pharmacien/', { state: { data } });
                        else if(data.latitude===0)
                        navigate('/pharmacien/profilePh', { state: { data } });
                    }else if (role === "admin" ) {
                   
                        navigate('/admin/mapsAdmin', { state: { data } });
                }else {
                    alert(data.message || 'Email ou mot de passe incorrect.');
                }
            } else {
                const errorData = await response.json(); 
                alert(errorData.message || 'Email ou mot de passe incorrect.');
            }}else {
                const errorData = await response.json(); 
                alert(errorData.message || 'Email ou mot de passe incorrect.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Email ou mot de passe incorrect..');
        }
    };
    
    

    return (
        <div className="body">
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setNom(e.target.value)}
                        />
                        <Components.Input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input
                            type='email'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Select
                            options={roleOptionsIn} 
                            onChange={handleRoleChange}
                            placeholder="role"
                            styles={customStyles}
                        />
                        <Components.Anchor href='#'><Link to="/forg" style={{ textDecoration: 'none', color: '#ff5d22' }}>
        Forgot your password?
    </Link></Components.Anchor>
                        <Components.Button onClick={handLognIn}>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Bienvenue de nouveau !</Components.Title>
                            <Components.Paragraph>
                                Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Bonjour!</Components.Title>
                            <Components.Paragraph>
                                Entrez vos informations personnelles et profitez de nos services pour prendre soin de votre santé.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
}

export default Connection;
