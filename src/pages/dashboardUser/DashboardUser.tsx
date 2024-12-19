import React from 'react';
import HearderUser from '../../components/dashboardUser/HeaderUser';
import Cartes from '../../components/customComponent/Cartes';
import { Outlet } from 'react-router-dom';

const DashboardUser: React.FC = () => {
  const tabsContent = [
    {
      label: "Payer ma facture", nombre: "", path: "/dashboard_user/payer_ma_facture"
    },
    {
      label: "Factures payées", nombre: "20/30", path: "/dashboard_user/factures_payes"
    },
    {
      label: "Mes paiements mensuels", nombre: "1/12 Mois", path: "/dashboard_user/paiement_mensuel"
    }
  ]

  return (
    <div className='container'>
      <HearderUser />

      <div className='row mt-3'>
        <Cartes tabs={tabsContent} />
      </div>
      <main className='row mt-3'>
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardUser;
