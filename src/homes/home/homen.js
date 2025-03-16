import React from 'react';
import { NavLink } from 'react-router-dom';
import home from '../images/jrb.png';
import '../css/home.css'
export default function Home(){
    return(
        <>
        <div className='mainSection'>
            <div className='contentBox'>
                <h1>Bienvenue dans le système de pharmacie en ligne</h1>
                <pre>Nos services sont disponibles pour tous les patients,<br/>
                 et vous pouvez désormais commander vos médicaments<br/>
                facilement depuis chez vous.
                </pre>
                <div className="btnBox">
                    <div className="btn">
                        <NavLink to="/article"  className= 'readMore'>Read More</NavLink>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img className='img' src={home} alt="home" />
            </div>
        </div>
        </>
    )
}