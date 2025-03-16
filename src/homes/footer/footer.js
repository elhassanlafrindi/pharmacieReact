import React from 'react';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../css/footer.css';
import home from '../images/home.png';
 const Footer=()=>{
    return(
        <>
        <footer>
            <div className='containerr containerr-flex'>
                <div className='iconss'>
                <a href="https://www.example.com/x" target="_blank" rel="noopener noreferrer">
                <XIcon className='iconn' />
                </a>
                <a href="https://www.facebook.com/ahmed.lachquih.3" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className='iconn' />
                </a>   
                <a href="https://www.instagram.com/a_lachq" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className='iconn' />
                </a>
                <a href="https://www.linkedin.com/in/ahmed-lachquih" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className='iconn' />
                </a>
                </div>
                <div className="home">
                    <img className='imghome' src={home} alt="home" />
                </div>
                <div className='cory-right'>
                    <pre>
                          All rights reserved &copy;<br/>
                        Made by group info Ensa agadir
                    </pre>
                </div>
            </div>
        </footer>
        </>
    )
}
export default Footer;