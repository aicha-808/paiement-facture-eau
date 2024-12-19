import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Login from '../pages/authPage/LoginForm';
import Register from '../pages/authPage/Register';
import AuthLayout from '../layout/AuthLayout';
import ForgotPassword from '../pages/authPage/ResetPassWord';
import ValidPassWord from '../pages/authPage/ValidPassWord';

export const AuthRoutes: RouteObject[] = [
  {
    path : '',
    element: <AuthLayout />,
    children: [
      {
        path: "/", 
        element: <Navigate to='/login' replace />, // Redirige vers la page de connexion
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/valid-password',
        element: <ValidPassWord />,
      },
    ]
  },

 
];
