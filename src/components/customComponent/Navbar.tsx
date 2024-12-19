import React from 'react';
import { Link, useLocation } from 'react-router-dom';


// Définition du type des props
interface NavLink {
  path: string;
  label: string;
    //   icon: React.ComponentType;
}

interface NavbarProps {
  links: NavLink[];
}


const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const location = useLocation();

  return (
    <nav >
      <ul className='d-flex flex-column  p-0' >
        {links.map((link, index) => (
          <li key={index} className=' mb-3 list-unstyled '>
            <Link to={link.path} className='text-light text-decoration-none d-flex align-items-center gap-2'  style={{
                color: location.pathname === link.path ? 'blue' : 'black',
                textDecoration: location.pathname === link.path ? 'underline' : 'none',
              }}>
                  {/* <link.icon /> */}
                  {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
