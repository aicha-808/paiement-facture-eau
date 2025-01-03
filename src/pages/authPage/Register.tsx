import React, { useState } from 'react';
import { useRegisterMutation } from '../../services/authApi';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Regex pour valider le numéro de téléphone (format international)
const validatePhoneNumber = (phone: string) => {
  const regex = /^\+?1?\d{9,15}$/; // Exemple : +1234567890 ou 1234567890
  return regex.test(phone);
};

// Regex pour valider le mot de passe
export const validatePassword = (password: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{8,}$/;
  ;
  return regex.test(password);
};

// Définir le type pour le rôle
type Role = 'admin' | 'membre' | undefined;

const Register: React.FC = () => {
  const [registerUser] = useRegisterMutation();
  const [formData, setFormData] = useState({
    nom: '',
    phoneNumber: '',
    role: '' as Role,
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Accéder à l'état global Redux pour récupérer le rôle de l'utilisateur et son statut d'authentification
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Récupérer le rôle depuis l'utilisateur authentifié
  // const userRole = user?.role;

  // Si l'utilisateur n'est pas authentifié, on empêche l'accès au formulaire d'inscription
  if (!isAuthenticated) {
    return <div>Vous devez être connecté en tant qu'administrateur pour inscrire un utilisateur.</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'état des erreurs

    // Validation du numéro de téléphone
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError('Le numéro de téléphone n\'est pas valide');
      return;
    }

    // Validation du mot de passe
    if (!validatePassword(formData.password)) {
      setError('doit contenir : une majuscule, une minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères.');
      return;
    }

    try {
      const response = await registerUser({
        name: formData.nom,
        phone_number: formData.phoneNumber,
        role: formData.role,
        password: formData.password,
      }).unwrap();
  
      if (!response || typeof response !== 'object') {
        throw new Error('Données retournées invalides');
      }
  
      console.log(response);
      alert('Utilisateur inscrit avec succès');
      navigate('/dashboard_admin');
    } catch (err) {
      console.error('Erreur:', err);
      setError("Erreur lors de l'inscription: Conectez-vous en tant que Admin");
    }
  };

  return (
    <>
      <div className='col-lg-6 col-sm-12'>
        <div className=''><img src="/loginImg.jpg" alt="" className='img-fluid '/></div>
      </div>
      <div className='col-lg-6 col-sm-12 bg-success p-3 '>
        <h2 className='text-light'>Inscription d'un utilisateur</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control rounded-0"
              type="text"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control rounded-0"
              type="number"
              placeholder="Numéro de téléphone"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control rounded-0"
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-control rounded-0"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
              required
            >
              <option value="">Sélectionner le rôle</option>
              <option value="admin">Admin</option>
              <option value="membre">Membre</option>
            </select>
          </div>
          <button type="submit" className="btn btn-light form-control rounded-0">
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
