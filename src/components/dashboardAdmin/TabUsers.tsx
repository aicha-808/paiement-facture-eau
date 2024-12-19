import React from 'react';
import { useDeleteUserMutation, useUsersQuery } from '../../services/authApi';
import { Link } from 'react-router-dom';

const TabUsers: React.FC = () => {
  // Récupération des utilisateurs via l'API
  const { data: users, error, isLoading, refetch } = useUsersQuery({
    page: 1,
    pageSize: 10,
  });

  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return (
      <div className="container pt-5">
        <h4>Chargement des utilisateurs...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container pt-5">
        <h4>Une erreur est survenue lors du chargement des utilisateurs.</h4>
      </div>
    );
  }

  const handleDelete = async (userId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await deleteUser(userId).unwrap();
        alert('Utilisateur supprimé avec succès !');
        refetch(); // Recharge la liste des utilisateurs
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        alert('Une erreur s\'est produite lors de la suppression de l\'utilisateur.');
      }
    }
  };

  return (
    <>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index: number) => (
              <tr key={user.phone_number}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phone_number}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    type='button'
                    to="/detail_user"
                    className="btn btn-primary text-decoration-none ms-1"
                    style={{ cursor: 'pointer' }}
                  >
                    Voir
                  </Link>
                  <Link
                    type='button'
                    to="/update_user"
                    state={{ user }}
                    className="btn btn-success text-decoration-none ms-1"
                    style={{ cursor: 'pointer' }}
                  >
                    Modifier
                  </Link>
                  <button
                    className="btn btn-danger ms-1"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(user.phone_number)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Aucun utilisateur trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TabUsers;
