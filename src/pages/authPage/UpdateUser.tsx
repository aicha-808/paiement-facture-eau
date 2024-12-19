import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterPayload, useUpdateUserMutation } from '../../services/authApi';

const UpdateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  const { user } = location.state || {};

  // Redirection si aucun utilisateur n'est fourni
  React.useEffect(() => {
    if (!user) {
      navigate('/dashboard_admin');
    }
  }, [user, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>({
    defaultValues: {
        name: user.name,
        phone_number: user.phone_number,
        role: user.role, 
    }, 
  });

  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    try {
      await updateUser({ userId: user.phone_number, userData: data }).unwrap();
      alert('Utilisateur mis à jour avec succès !');
      navigate('/dashboard_admin'); // Redirige vers le tableau de bord
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      alert("Une erreur s'est produite.");
    }
  };

  if (!user) return null; // Empêche le rendu si l'utilisateur est absent

  return (
    <div className='container p-5'>
      <div className='row g-0'>
        <div className='col-lg-6 col-sm-12'>
          <div className=''><img src="/loginImg.jpg" alt="" className='img-fluid '/></div>
        </div>
        <div className='col-lg-6 col-sm-12 bg-success p-3 '>
          <h1>Modifier l'utilisateur</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label>Nom :</label>
              <input {...register('name', { required: 'Nom requis' })}  className="form-control"/>
              {errors.name && <span>{String(errors.name.message)}</span>}
            </div>
            <div>
              <label>Téléphone :</label>
              <input {...register('phone_number', { required: 'Téléphone requis' })} className="form-control" />
              {errors.phone_number && <span>{String(errors.phone_number.message)}</span>}
            </div>
            <div>
              <label>Rôle :</label>
              {errors.name && <span>{String(errors.name.message)}</span>}
              <select {...register('role', { required: 'Rôle requis' })} className="form-control">
                <option value="admin">Admin</option>
                <option value="member">Membre</option> {/* Adaptez selon vos choix backend */}
              </select>
              {errors.role && <span>{String(errors.role.message)}</span>}
            </div>
            <button type="submit" className="btn btn-success form-control">Mettre à jour</button>
          </form>
        </div>
      </div>
      </div>
  );
};

export default UpdateUser;
