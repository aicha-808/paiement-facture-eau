import React from 'react';
import {useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '../../services/authApi';

const Logout: React.FC  = () => {

  const [logOut] = useLogOutMutation();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
        await logOut().unwrap();
        localStorage.removeItem('user');
        alert("vous êtes déconnecté avec succès")
        navigate('/login')
    } catch (error) {
        console.error('erreur lors de la deconnexion:', error);
    }
  }

  return (
    <>
        <span className="text-light text-italic" onClick={handleLogout}>Déconnexion</span>
    </>
  );
};

export default Logout;
