import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePasswordValidateMutation } from '../../services/authApi';  // Assurez-vous que cette mutation existe
import { validatePassword } from '../authPage/Register';  

const ValidPassWord: React.FC = () => {
  const [newPassword, setNewPassWord] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Utilisation de la mutation RTK Query pour réinitialiser le mot de passe
  const [resetPassword, { isLoading, isError, error: apiError }] = usePasswordValidateMutation();

  // Valider les champs du formulaire
  const validateForm = () => {
    if (!token || !newPassword) {
      setError('Tous les champs sont obligatoires.');
      return false;
    }
    if (!validatePassword(newPassword)) {
      setError('Le mot de passe doit commencer par une majuscule, contenir 5 chiffres et un caractère spécial.');
      return false;
    }
    setError('');
    return true;
  };

  // Gérer l'envoi du formulaire (soumettre la mutation RTK Query)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Appel à la mutation pour réinitialiser le mot de passe
      await resetPassword({ token, newPassword }).unwrap();

      // Si la réinitialisation réussit
      setSuccess(true);

      // Rediriger l'utilisateur vers la page de connexion après 2 secondes
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      // Gérer les erreurs API ici
      if (isError && apiError) {
        setError('Une erreur est survenue, veuillez réessayer.');
      }
    }
  };

  return (
    <div className="col-lg-4 col-sm-12 mx-auto bg-success p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="code" className="text-light">Code de réinitialisation envoyé par SMS</label>
          <input
            id="code"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="text-light">Nouveau mot de passe</label>
          <input
            id="newPassword"
            type="password"  // Utilisez "password" pour masquer le texte
            value={newPassword}
            onChange={(e) => setNewPassWord(e.target.value)}
            className="form-control"
          />
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}
        {success && <div className="text-success mb-3">Mot de passe réinitialisé avec succès ! Redirection en cours...</div>}

        <button type="submit" className="btn btn-light form-control" disabled={isLoading}>
          {isLoading ? 'Chargement...' : 'Réinitialiser le mot de passe'}
        </button>
      </form>
    </div>
  );
};

export default ValidPassWord;
