import React from 'react';
import Hearder from '../../components/dashboardAdmin/Hearder';


const VerseAnnuel: React.FC = () => {

  return (
    <div className='container'>
      <Hearder />
        {/* creer une carte clicquable portant versement 2024 et montant versé qui ouvrira ce tableau */}
         <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Mois</th>
            <th>Montant total</th>
            <th>Totaux annuels</th>
          </tr>
        </thead>
        <tbody>
              <tr>
                <td>Janvier</td>
                <td>500.000</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Févier</td>
                <td>600.000</td>
                <td>-</td>
              </tr>
        </tbody>
      </table>

    </div>
  );
};

export default VerseAnnuel;
