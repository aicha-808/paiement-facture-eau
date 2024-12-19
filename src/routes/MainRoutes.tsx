import React from 'react';
import { RouteObject } from 'react-router-dom';
import Dashboard from '../pages/dashboardAdmin/DashboardAdmin';
// import Profile from './pages/main/Profile';
import NotFound from '../pages/authPage/NotFoud';
import MainLayout from '../layout/MainLayout';
import UpdateUser from '../pages/authPage/UpdateUser';
import DashboardUser from '../pages/dashboardUser/DashboardUser';
import Users from '../pages/dashboardAdmin/Users';
import FacturePayes from '../pages/dashboardAdmin/FacturePayes';
import MembresActifs from '../pages/dashboardAdmin/MembresActifs';
import MontanTotal from '../pages/dashboardAdmin/MontanTotal';
import FactureForm from '../pages/dashboardUser/FactureForm';
import PaiementMensuel from '../pages/dashboardUser/PaiementMensuel';
import RobinetPublicForm from '../pages/dashboardUser/RobinetPublicForm';
import CompteurForm from '../pages/dashboardUser/CompteurForm';
import VerseAnnuel from '../pages/dashboardAdmin/VerseAnnuel';
import MesReçus from '../components/dashboardUser/MesReçus';
import MesDocuments from '../components/dashboardUser/MesDocuments';
// import ProtectedRoute from '../components/ProtectedRoutes';

// const isAuthenticated = true; // À remplacer par votre logique d'authentification

export const MainRoutes: RouteObject[] = [
  {
    // element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
    element: <MainLayout />,
    children: [
      // elements du dashboard admin
      { 
        path: '/dashboard_admin',
        element: <Dashboard />,
        children: [
          { path: 'factures_payes', element: <FacturePayes /> },
          { path: 'membres_actifs', element: <MembresActifs /> },
          { path: 'montant_total', element: <MontanTotal /> },
        ]
      },
      
      { path: '/liste_utilisateur', element: <Users /> },
      { path: '/Versement_annuel', element: <VerseAnnuel /> },
      // Elements du dashboard user
      { path: '/dashboard_user', 
        element: <DashboardUser />,
        children: [
          {path: '/dashboard_user/payer_ma_facture', element: <FactureForm />,
            children: [
              {path: '/dashboard_user/payer_ma_facture/robinet_public', element: <RobinetPublicForm /> },
              {path: '/dashboard_user/payer_ma_facture/compteur_prive', element: <CompteurForm /> },
            ]
           },
          {path: '/dashboard_user/factures_payes', element: <FacturePayes /> },
          {path: '/dashboard_user/paiement_mensuel', element: <PaiementMensuel /> },
        ]
      },
      { path: '/mes_reçus', element: <MesReçus /> },
      { path: '/mes_documents', element: <MesDocuments /> },
      //   { path: '/profile', element: <Profile /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/update_user',
    element: <UpdateUser />,
  },
];
