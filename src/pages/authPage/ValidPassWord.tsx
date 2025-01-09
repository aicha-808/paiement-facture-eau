import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePasswordValidateMutation } from '../../services/authApi';  // Assurez-vous que cette mutation existe
import { validatePassword } from '../authPage/Register';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ValidPassWord: React.FC = () => {
  const [newPassword, setNewPassWord] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      setError('doit contenir : une majuscule, une minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères.');
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
    <div className="col-lg-4 col-sm-12 mx-auto bg-success p-4">
      <form onSubmit={handleSubmit} className=''>
        <div className="mb-3">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="form-control"
            placeholder='Saisir le code de réinitialisation'
          />
        </div>

        <div className="mb-3">
          <div className="input-group">
            <input
              className="form-control"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassWord(e.target.value)}
              placeholder="nouveau mot de passe"
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
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
