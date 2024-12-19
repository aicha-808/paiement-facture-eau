import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { Link, useLocation } from 'react-router-dom';


// Définition du type des props
interface CardTexte {
  path: string;
  label: string;
  nombre: string;
//   icon: React.ComponentType;
}

interface CardProps {
  tabs: CardTexte[];
}

const Cartes: React.FC<CardProps> = ({ tabs }) => {
  const location = useLocation();

  return (
    <>
    { 
      tabs.map((tab, index)  => (
        <div className='col-lg-4 col-sm-12'>
          <Link to={tab.path} key={index} className={`card mb-3 text-decoration-none ${
              location.pathname.includes(tab.path) ? 'active-card' : ''
            }`}> 
            <div className="card-body">
              <h4 className="card-text">{tab.label}</h4>
              <p className="card-text">{tab.nombre}</p>
            </div>
          </Link>
        </div> 
      ))
    } 
    </>
  );
};

export default Cartes;
