import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../customComponent/Logout';
import Navbar from '../customComponent/Navbar';

const SideBarAdmin: React.FC = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const navLinks = [
    { path: '/dashboard_admin', label: 'Tableau de bord' },
    { path: '/liste_utilisateur', label: 'Utilisateurs' },
    { path: '/Versement_annuel', label: 'Versement annuel' },
  ];

  return (
    <div className="sidebar-admin d-flex flex-column h-100">
      {/* Profil */}
      <div className="profile-section text-center">
        <Link
          to="#"
          className="d-block link-dark text-decoration-none dropdown-toggle"
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        >
          <img
            src="https://github.com/mdo.png"
            alt="md"
            width="32"
            height="32"
            className=" bg-success"
          />
        </Link>
        {isDropDownOpen && (
          <ul className="dropdown-menu text-small show">
            <li>
              <Link className="dropdown-item" to="#">
                Profile
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Navigation */}
      <div className="menu-section mt-3">
        <Navbar links={navLinks} />
      </div>

      {/* Logout (Positionné en bas) */}
      <div className="logout-section mt-auto">
        <Logout />
      </div>
    </div>
  );
};

export default SideBarAdmin;
