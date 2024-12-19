// layouts/MainLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarUser from '../components/dashboardUser/SidebarUser';
import SideBarAdmin from '../components/sidebar/SideBarAdmin';


const MainLayout = () => {
    const location = useLocation();
    // Mapping des routes vers leurs barres latérales respectives
    const sidebarMap: { [key: string]: JSX.Element } = {
    '/dashboard_admin': <SideBarAdmin />,
    '/liste_utilisateur': <SideBarAdmin />,
    '/Versement_annuel': <SideBarAdmin />,
    '/dashboard_user': <SidebarUser />,
    '/mes_reçus': <SidebarUser />,
    '/mes_documents': <SidebarUser />,
    };

  // Recherche du composant Sidebar approprié
  const currentSidebar = Object.keys(sidebarMap).find((path) =>
    location.pathname.startsWith(path)
  );
   

    return (
        <div className="container-fluid d-flex min-vh-100 flex-column p-0">
            <div className="row flex-grow-1 m-0">
                <div className="col-lg-2 bg-secondary p-4">
                    {currentSidebar ? sidebarMap[currentSidebar] : null}
                </div>
                <main className="bg-light col-lg-10 px-3">
                   <Outlet />
                </main>
            </div>
            <div className="bg-secondary z-index-1 fixed-bottom p-2 d-flex align-items-center justify-content-center">
                {/* <Footer /> */} 
            </div>
        </div>
    );
};

export default MainLayout;



















