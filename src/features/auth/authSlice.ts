import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: {
    name: string;
    phone_number: string;
    role: 'admin' | 'membre';
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken') || null,
  user: null,  // Ne pas récupérer depuis localStorage pour l'inscription
  isAuthenticated: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour connecter un utilisateur
    login: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      console.log('Données utilisateur avant enregistrement:', action.payload.user);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      // Sauvegarder le token et l'utilisateur
      try {
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      } catch (error) {
        console.error("Erreur lors de l’enregistrement dans localStorage:", error);
      }
    },

    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Supprimer le token et l'utilisateur de localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    },

    // Action pour mettre à jour les informations de l'utilisateur
    updateUser: (state, action: PayloadAction<AuthState['user']>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };

        // Sauvegarder les informations mises à jour de l'utilisateur dans localStorage
        try {
          localStorage.setItem('authUser', JSON.stringify(state.user));
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'utilisateur dans localStorage:", error);
        }
      }
    },

    // Action pour changer le token, utile si vous voulez faire un rafraîchissement de token par exemple
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      try {
        localStorage.setItem('authToken', action.payload);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du token dans localStorage:', error);
      }
    },
  },
});

// Exporter les actions pour les utiliser dans vos composants
export const { login, logout, updateUser, setToken } = authSlice.actions;

// Exporter le reducer
export default authSlice.reducer;
