import React from 'react';
import '../css/article.css';

const Article = () => {
    return (
        <div className='articleContainer'>
            <h1>Comment fonctionne le système électronique de pharmacie en ligne ?</h1>
            <p>Avec l'évolution de la technologie, il est devenu facile pour les patients d'obtenir les médicaments demandés de manière pratique via Internet. Ce système vous permet de vous inscrire sur notre application en tant que patient, de soumettre votre ordonnance, et de choisir la pharmacie la plus proche pour vous livrer les médicaments rapidement.</p>

            <h2>Comment s'inscrire et se connecter</h2>
            <p>La première étape pour utiliser le système électronique est de créer un compte en tant que patient. Une fois que vous vous connectez à l'application, vous pouvez créer un nouveau compte en tant que patient. Après l'inscription, vous pourrez entrer vos informations personnelles comme votre nom, votre numéro de téléphone et votre adresse e-mail.</p>

            <h2>Comment télécharger l'ordonnance</h2>
            <p>Une fois inscrit, vous pouvez télécharger votre ordonnance sur la plateforme. Grâce à l'option de téléchargement d'ordonnance, vous pourrez l'envoyer à la pharmacie la plus proche.</p>

            <h2>Choisir la pharmacie la plus proche</h2>
            <p>À cette étape, il vous sera demandé de choisir la pharmacie la plus proche de votre emplacement en utilisant Google Maps. Vous pouvez déterminer votre emplacement via GPS, ce qui facilite la recherche des pharmacies à proximité.</p>

            <h2>Comment le pharmacien reçoit la commande</h2>
            <p>Après avoir envoyé votre ordonnance, le pharmacien recevra une notification contenant votre ordonnance. À ce moment-là, le pharmacien pourra préparer les médicaments demandés selon la prescription.</p>

            <h2>Préparation et préparation des médicaments par le pharmacien</h2>
            <p>Le pharmacien préparera les médicaments pour vous en fonction de l'ordonnance, tout en s'assurant de leur exactitude. Une fois les médicaments prêts, le pharmacien les emballera et les préparera pour l'expédition.</p>

            <h2>Suivi de l'état de la commande</h2>
            <p>Grâce à notre application, vous pouvez suivre l'état de votre commande à tout moment. Il vous suffit de vous connecter à votre compte et de vous rendre dans la section "Suivi de la commande". Vous pourrez alors voir les détails de votre commande, y compris :</p>
            <ul>
                <li><strong>État de la commande :</strong> Vous saurez si l'ordonnance a été reçue par le pharmacien ou non.</li>
                <li><strong>Préparation des médicaments :</strong> Si les médicaments sont prêts à être préparés ou s'ils ont déjà été préparés.</li>
                <li><strong>Livraison :</strong> Vous saurez si la commande a été livrée ou si elle est en route vers vous.</li>
            </ul>
            <p>Toutes ces informations vous apportent la tranquillité d'esprit et vous aident à savoir où en est votre commande, facilitant ainsi l'attente.</p>

            <h2>Commande et livraison</h2>
            <p>Une fois les médicaments prêts, la livraison sera effectuée à votre adresse dans les plus brefs délais. Vous pouvez choisir le mode de paiement qui vous convient (paiement à la livraison ou paiement en ligne).</p>

            <h2>Conclusion</h2>
            <p>Le système électronique de pharmacie contribue grandement à faciliter l'accès aux médicaments et à faire gagner du temps aux patients. Grâce à cette technologie moderne, le patient peut recevoir ses médicaments rapidement et en toute sécurité.</p>
        </div>
    );
}

export default Article;
