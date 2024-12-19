import React from 'react';
import Cartes from '../../components/customComponent/Cartes';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Hearder from '../../components/dashboardAdmin/Hearder';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const tabsContent = [
    { label: "Factures payées", nombre: "20/50", path: "factures_payes" },
    { label: "Membres actifs", nombre: "40/50 personnes", path: "membres_actifs" },
    { label: "Montant total ", nombre: "300.000/500.000 GNF", path: "montant_total" },
  ];
  const isDefaultPath = location.pathname === '/dashboard_admin';

  return (
    <div className='container'>
      <Hearder/>
      <div className='row mt-5'>
        <Cartes tabs={tabsContent} />
      </div>
      <main className='row'>
        <Outlet />
        {isDefaultPath && <Navigate to="factures_payes" replace />}
      </main>
    </div>
  );
};

export default Dashboard;
