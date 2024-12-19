import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';

const ResetPassword: React.FC  = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ phone_number: phoneNumber }).unwrap();
      alert("Numero de téléphone envoyé avec succès");
      navigate('/valid-password')
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <div className="col-lg-4 col-sm-12 mx-auto bg-success p-3">
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="num" className='text-light'>Numéro de téléphone</label>
                <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className='form-control mt-2'
                />
            </div>
        <button type="submit" className="btn btn-light form-control">Se Connecter</button>
        </form>
    </div>
  );
};

export default ResetPassword;
