import React from 'react';
import CadreTab from '../../components/customComponent/CadreTab';


const MembresActifs: React.FC = () => {
  const columns = [
    { key: 'num', label: 'N°'},
    { key: 'nom', label: 'Prénom & Nom'},
    { key: 'téléphone', label: 'Téléphone'},
    { key: 'statut', label: 'Statut'},
  ];

  const data = [
    { num: '1', nom: 'Aissatou barry', téléphone: '+12345678', statut: 'Payé' },
    { num: '2', nom: 'Aliou Bah', téléphone: '+098766544', statut: 'Non Payé' },
  ];
  return (
    <div className='container'>
      <CadreTab columns={columns} data={data} 
        actions={ () => (
          <>
            <button className='btn btn-secondary'>Voir</button>
          </>
          )
        }
      />
    </div>
  );
};

export default MembresActifs;
