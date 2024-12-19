import React from 'react';
import TabUsers from '../../components/dashboardAdmin/TabUsers';
import Hearder from '../../components/dashboardAdmin/Hearder';

const Users: React.FC = () => {

  return (
    <div className='container'>
      <Hearder/>
      <div className='row mt-5 px-3'>
        <h4 className='text-success mt-3'>Liste des utilisateurs</h4> 
        <TabUsers />
      </div>
    </div>
  );
};

export default Users;
