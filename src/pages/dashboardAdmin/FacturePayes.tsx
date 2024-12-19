import React from 'react';
import CadreTab from '../../components/customComponent/CadreTab';


const FacturePayes: React.FC = () => {
  const columns = [
    { key: 'num', label: 'N°'},
    { key: 'nom', label: 'Prénom & Nom'},
    { key: 'téléphone', label: 'Téléphone'},
    { key: 'date_paiement', label: 'Date Paiement'},
    { key: 'montant', label: 'Montant'},
  ];

  const data = [
    { num: '1', nom: 'Aissatou barry', téléphone: '+12345678', date_paiement: '01-12-2024', montant: '10.000 GNF' },
    { num: '2', nom: 'Aliou Bah', téléphone: '+098766544', date_paiement: '10-12-2024', montant: '10.000 GNF' },
  ];

  return (
    <div className='container'>
     <CadreTab columns={columns} data={data} />
    </div>
  );
};

export default FacturePayes;
