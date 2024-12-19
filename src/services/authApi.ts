import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

// Interfaces pour les charges utiles des requêtes
export interface RegisterPayload {
  name: string;
  phone_number: string;
  password: string;
  role?: 'admin' | 'membre';
}

export interface LoginPayload {
  phone_number: string;
  password: string;
}

export interface ForgotPasswordPayload {
  phone_number: string;
}
export interface UsersQueryArgs {
  page?: number;   // Pagination - numéro de page
  pageSize?: number; // Pagination - taille de la page
}

// Configuration de l'API RTK Query
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/', // URL de base pour vos endpoints
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token; // Récupérer le token du store Redux
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginPayload>({
      query: (credentials) => {
        console.log('Credentials:', credentials); // Vérifiez les données envoyées
        return {
          url: 'login/',
          method: 'POST',
          body: credentials,
        };
      },
      
    }),
    register: builder.mutation<any, RegisterPayload>({
      query: (newUser) => ({
        url: 'register/', // Endpoint pour l'inscription
        method: 'POST',
        body: newUser,
      }),
    }),
    forgotPassword: builder.mutation<any, ForgotPasswordPayload>({
      query: (data) => ({
        url: 'request-password-reset/', // Endpoint pour le mot de passe oublié
        method: 'POST',
        body: { phone_number: data.phone_number }, // Inclure `phone_number` dans le body
      }),
    }),
    passwordValidate: builder.mutation<any, { token: string, newPassword: string }>({
      query: ({ token, newPassword }) => ({
        url: 'reset-password', // Endpoint pour réinitialiser le mot de passe
        method: 'POST',
        body: {
          token,
          newPassword,
        },
      }),
    }),
    refresh: builder.mutation<any, void>({
      query: () => ({
        url: 'refrech/', // Endpoint pour rafraîchir le token
        method: 'POST',
      }),
    }),
    logOut: builder.mutation<any, void>({
      query: () => ({
        url: 'logout/',
        method: 'POST',
      }),
    }),
    //liste des users
    users: builder.query<RegisterPayload[], UsersQueryArgs>({
      query: ({page = 1, pageSize = 10 }) => ({
        url: 'users/', 
        method: 'GET',
        params: {
          page,
          pageSize,
        },
      }),
    }),
    // update and delete user
    updateUser: builder.mutation<any, { userId: string, userData: RegisterPayload }>({
      query: ({ userId, userData }) => ({
        url: `update-user/${userId}/`,  // Utilisation de l'ID dynamique
        method: 'PUT',
        body: userData,  // Corps de la requête contenant les informations à mettre à jour
      }),
    }),
    
    deleteUser: builder.mutation<any, string>({
      query: (userId) => ({
        url: `delete-user/${userId}/`,  // Utilisation de l'ID dans l'URL
        method: 'DELETE',
      }),
    }),
    
  }),
});

// Hooks générés par RTK Query
export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useRefreshMutation,
  useUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  usePasswordValidateMutation,
  useLogOutMutation,
} = authApi;
