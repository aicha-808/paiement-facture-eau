import React from 'react';


const MontanTotal: React.FC = () => {

  return (
    <div className='container'>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Versement</th>
            <th>Montant</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01-01-2024</td>
            <td>10.000</td>
            <td>-</td>
          </tr>
          <tr>
            <td>02-01-2024</td>
            <td>10.000</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MontanTotal;
