import React from 'react';
import { Link } from 'react-router-dom';
// import Logout from '../customComponent/Logout';

const HearderUser: React.FC  = () => {
//   const [isDropDownOpen, setIsDropDownOpen] = useState(false);
 

  return (
    <>
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span className="fs-4">Diyan-Thyallouwol</span>
            </Link>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 mx-lg-auto">
                <input type="search" className="form-control form-control-dark rounded-4" placeholder="Search..." aria-label="Search" />
            </form>
            <div className="text-end d-flex align-items-center">
                <Link to='/login' type="button" className="btn btn-success me-2">Login</Link>
                {/* <span className="dropdown ">
                    <Link to="#" className="d-block link-dark text-decoration-none dropdown-toggle" 
                        onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                        <img src="https://github.com/mdo.png" alt="md" width="32" height="32" className="rounded-circle" />
                    </Link>
                    {isDropDownOpen && (
                        <ul className="dropdown-menu text-small show" >
                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                        <li><Logout /></li>
                    </ul>
                    )}
                </span> */}
            </div>
        </header>
    </>
  );
};

export default HearderUser;
