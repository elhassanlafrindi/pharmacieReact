import React from 'react';
import plus from '../images/new.png'
import { NavLink } from 'react-router-dom';
import SearchComponent from '../search/search'
import PersonIcon from '@mui/icons-material/Person';
import '../css/list.css';
export default function List(){
    return(
        <>
        <header>
        <div className='container container-flex'>
        <div className='logContainer'>
          <img src={plus} alt="pharm" className='logo' />
        </div>
        <nav>
          <div className='list'>
            <NavLink to="/"  className={({ isActive }) => isActive ? 'listItem activeItem' : 'listItem'}>Home</NavLink>
            <NavLink to="/about"  className={({ isActive }) => isActive ? 'listItem activeItem' : 'listItem'}>About</NavLink>
            <NavLink to="/services"  className={({ isActive }) => isActive ? 'listItem activeItem' : 'listItem'}>Services</NavLink>
            <NavLink to="/contact"  className={({ isActive }) => isActive ? 'listItem activeItem' : 'listItem'}>Contact</NavLink>
            <NavLink to="/maps"  className={({ isActive }) => isActive ? 'listItem activeItem' : 'listItem'}>Maps</NavLink>
            <NavLink to="/policy"  className={({ isActive }) => isActive ? 'listItem activeItem' : 'listItem'}>Support</NavLink>


          </div>
        </nav>
        <div className="icons">
          <SearchComponent/>
          <NavLink to="/connection">
               <PersonIcon className="icon" />
          </NavLink>
        </div>
      </div>
        </header>
        </>
        
    )
}