import React from 'react';
import '../css/services.css';

import LoginIcon from '@mui/icons-material/Login';
import UploadIcon from '@mui/icons-material/Upload';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SendIcon from '@mui/icons-material/Send';
import TimelineIcon from '@mui/icons-material/Timeline';
import PaymentIcon from '@mui/icons-material/Payment';

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">Nos Services Spéciaux</h1>
      <p className="services-description">
        Découvrez nos services diversifiés qui vous aident à obtenir vos médicaments de manière rapide, sécurisée et pratique.
      </p>

      <div className="services-cards">
        <div className="service-card">
          <div className="service-icon">
            <LoginIcon style={{ fontSize: 50, color: '#4CAF50' }} />
          </div>
          <h2>Inscription & Connexion</h2>
          <p>
            Créez un compte avec votre nom, e-mail et numéro de téléphone. Connectez-vous en toute sécurité pour gérer votre profil.
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <UploadIcon style={{ fontSize: 50, color: '#4CAF50' }} />
          </div>
          <h2>Télécharger une Ordonnance</h2>
          <p>
            Téléchargez votre ordonnance au format JPG ou PDF. Vérifiez que le fichier est valide avant de l'envoyer.
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <AddLocationAltIcon style={{ fontSize: 50, color: '#4CAF50' }} />
          </div>
          <h2>Trouver la Pharmacie la Plus Proche</h2>
          <p>
            Utilisez le GPS pour localiser la pharmacie la plus proche. Choisissez celle qui est la plus pratique pour une livraison rapide.
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <SendIcon style={{ fontSize: 50, color: '#4CAF50' }} />
          </div>
          <h2>Envoyer des Notifications</h2>
          <p>
            Lorsque vous téléchargez votre ordonnance, une notification est envoyée à la pharmacie pour traiter votre commande.
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <TimelineIcon style={{ fontSize: 50, color: '#4CAF50' }} />
          </div>
          <h2>Suivi de Commande</h2>
          <p>
            Suivez le statut de votre commande : reçue, en préparation, en transit ou livrée. Restez informé en temps réel.
          </p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <PaymentIcon style={{ fontSize: 50, color: '#4CAF50' }} />
          </div>
          <h2>Paiement et Livraison</h2>
          <p>
            Choisissez entre les options de paiement en ligne ou en espèces à la livraison. Votre commande sera livrée rapidement et en toute sécurité.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
