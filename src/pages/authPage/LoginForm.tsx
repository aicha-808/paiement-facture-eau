import React, { useState } from 'react';
import { useLoginMutation } from '../../services/authApi';
import { useAppDispatch } from '../../hooks/hooks';
import { login as loginAction } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import imgLogin from '../../assets/images/Screenshot_20220910-182326.png'

const phoneRegex = /^\+?1?\d{9,15}$/; // Numéro de téléphone
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{8,}$/;


const LoginForm: React.FC = () => {
  // États locaux pour le formulaire
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ phoneNumber?: string; password?: string }>({});

  // RTK Query et Dispatch
  const [loginMutation, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
 const navigate = useNavigate()

  // Validation du formulaire
  const validateForm = (): boolean => {
    const validationErrors: { phoneNumber?: string; password?: string } = {};

    if (!phoneRegex.test(phoneNumber)) {
      validationErrors.phoneNumber =
        'Le numéro de téléphone doit être valide (ex. : +22123456789).';
    }

    if (!passwordRegex.test(password)) {
      validationErrors.password =
        "Mot de passe invalide. Il doit contenir : une majuscule, une minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
 
  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // setErrors(null); 
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginMutation({ phone_number: phoneNumber, password }).unwrap();
      dispatch(loginAction({ token: response.access_token, user: response.user })); // Mise à jour du store
      console.log('Connexion réussie:', response);
      alert('Connexion réussie !');
      const userRole = response?.role;
      if (userRole ==="admin") {
        navigate('/dashboard_admin')
      } else if (userRole ==="membre") {
        navigate('/dashboard_user')
      } else{
        alert("Role de l'utilisateur est admin ou membre!")
      }
        localStorage.setItem('user', JSON.stringify(response));
    } catch (err: any) {
      console.error('Erreur complète:', err);
      alert('Erreur lors de la connexion. Vérifiez votre connexion ou réessayez.');
    }
  
  };

  return (
    <>
      <div className='col-lg-6 col-sm-12'>
        <div className=''><img src="/loginImg.jpg" alt="" className='img-fluid '/></div>
      </div>
      <div className='col-lg-6 col-sm-12 bg-success p-3'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-center text-light'>Connexion</h2>
          <div className='mb-3'>
            <label htmlFor="phoneNumber" className='text-light'>Numéro de téléphone</label>
            <input
              className='form-control'
              type="tel" 
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Numéro de téléphone"
              pattern="^\+?1?\d{9,15}$" 
              required
            />

            {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password" className='text-light'>Mot de passe</label>
            <input className='form-control'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </div>

          {/* Gestion des erreurs API */}
          {isError && (
            <div style={{ color: 'red' }}>
              {error && 'data' in error && (error.data as any)?.error
                ? (error.data as any).error
                : 'Conexion impossible, veuillez réessayer.'}
            </div>
          )}

         <div className='mb-3'>
            <button type="submit" disabled={isLoading} className='btn btn-light form-control'>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
          <div className='mb-3 text-lg-end text-sm-center'>
              <Link to="/forgot-password" className='text-light text-decoration-none'>Mot de passe oublié ?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
