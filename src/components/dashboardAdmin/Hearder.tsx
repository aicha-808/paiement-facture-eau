import React from 'react';
import { Link } from 'react-router-dom';

const Hearder: React.FC  = () => {


  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link to="/dashboard_admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span className="fs-4">Diyan-Thyallouwol</span>
        </Link>
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 mx-lg-auto">
            <input type="search" className="form-control form-control-dark rounded-5" placeholder="Search..." aria-label="Search" />
        </form>
        <div className="text-end d-flex align-items-center">
            <Link to='/login' type="button" className="btn btn-success me-2">Connexion</Link>
            <Link to='/register' type='button' className='btn btn-secondary me-2'>Inscription</Link>
        </div>
    </header>
  );
};

export default Hearder;
