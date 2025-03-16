import React, { useState } from "react";
import axios from 'axios';

import * as Components from './componentSign'; // as Components hya likhdam biha fkolchi lt7t
import '../css/connection.css';
import { useNavigate, useLocation } from 'react-router-dom';
import pharmacien from '../images/phrm.png';
import patient from '../images/file.png';

export default function Signup() {
    const [role, toggle] = React.useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { username, email, password } = location.state || {};
    const [usernameState, setUsernameState] = useState(username);
    const [emailState, setEmailState] = useState(email);
    const [passwordState, setPasswordState] = useState(password);
    const [telephone, setTelephone] = useState('');
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [nomPharmacie, setNomPharmacie] = useState('');

    const [message, setMessage] = useState('');




    const SignUpPharmacie = (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append("name", usernameState);
        formData.append("email", emailState);
        formData.append("password", passwordState);
        formData.append("telephone", telephone);
        

    
        axios.post("http://localhost:8080/web2/api/pharmacien/createAccount", formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((response) => {
            navigate('/succes');
        })
        .catch((error) => {
            console.error(error);
            setMessage("Erreur lors de l'ajout de pharmacien.");
        });
    }

    const SignUpPatient = (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append("name", usernameState);
        formData.append("email", emailState);
        formData.append("password", passwordState);
        formData.append("telephone", telephone);
    
        axios.post("http://localhost:8080/web2/api/patient/createAccount", formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((response) => {
            navigate('/succes');
        })
        .catch((error) => {
            console.error(error);
            setMessage("Erreur lors de l'ajout de patient.");
        });
    };
    

    return (
        <div className="body">
            <Components.Containert>
                <Components.SignUpContainer whorole={role.toString()}>
                    <Components.Formt>
                        <Components.Titlet>Pharmacien</Components.Titlet>
                        <Components.Inputt type='text' value={usernameState ||'username'} onChange={(e) => setUsernameState(e.target.value)} />
                        <Components.Inputt type='email' value={emailState  || 'email'} onChange={(e) => setEmailState(e.target.value)} />
                        <Components.Inputt type='password' value={passwordState || 'password'} onChange={(e) => setPasswordState(e.target.value)} />
                        <Components.Inputt type='text' placeholder='telephone' onChange={(e) => setTelephone(e.target.value)} />
                        <Components.Buttont onClick={SignUpPharmacie}>Valider</Components.Buttont>
                        <Components.Message>
                        {message}
                        </Components.Message>
                    </Components.Formt>
                </Components.SignUpContainer>

                <Components.SignInContainer whorole={role.toString()}>
                    <Components.Formt>
                        <Components.Titlet>Patient</Components.Titlet>
                        <Components.Inputt type='text' value={usernameState ||'username'} onChange={(e) => setUsernameState(e.target.value)} />
                        <Components.Inputt type='email' value={emailState || 'email'} onChange={(e) => setEmailState(e.target.value)} />
                        <Components.Inputt type='password' value={passwordState || 'password'} onChange={(e) => setPasswordState(e.target.value)} />
                        <Components.Inputt type='text' placeholder='telephone' onChange={(e) => setTelephone(e.target.value)}/>
                        <Components.Buttont onClick={SignUpPatient}>Valider</Components.Buttont>
                    </Components.Formt>
                </Components.SignInContainer>

                <Components.OverlayContainer whorole={role.toString()}>
                    <Components.Overlay whorole={role.toString()}>
                        <Components.LeftOverlayPanel whorole={role.toString()}>
                            <Components.Imgt src={pharmacien} alt="pharmacien" />
                            <Components.Paragraph>
                                En tant que pharmacien, entrez vos informations pour enregistrer votre pharmacie et accéder à nos services
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Patient
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel whorole={role.toString()}>
                            <Components.Imgt src={patient} alt="patient" />
                            <Components.Paragraph>
                                Complétez vos informations pour profiter de tous nos services
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Pharmacien
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Containert>
        </div>
    )
}
