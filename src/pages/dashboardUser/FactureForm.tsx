import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const FactureForm: React.FC = () => {

  return (
    <div className='col-lg-6 col-sm-12 '>
      <h4>Formulaire de paiement de votre facture d'eau:</h4>
      <div className='row mt-3'>
        <div className='col-lg-6 col-sm-12'>
            <Link to='/dashboard_user/payer_ma_facture/robinet_public' type='button' className='btn btn-warning border'>
                Robinet Public
            </Link>
        </div>
        <div className='col-lg-6 col-sm-12'>
            <Link to='/dashboard_user/payer_ma_facture/compteur_prive' type='button' className='btn border'>
                Compteur Privé
            </Link>
        </div>
        <main className='mt-3'>
          <Outlet />
        </main>
       
      </div>
    </div>
  );
};

export default FactureForm;
