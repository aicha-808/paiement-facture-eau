import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';
import { MainRoutes } from './MainRoutes';

const AppRouter: React.FC = () => {
  const routes = useRoutes([...AuthRoutes, ...MainRoutes]);
  return <>{routes}</>;
};

export default AppRouter;
