import React from 'react';


// Définition du type des props
interface Column {
  key: string;
  label: string;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  actions?:(item: T) => React.ReactNode;
}

const CadreTab = <T,>({ columns, data, actions }: TableProps<T>): JSX.Element => {
  return (
    <div className='table-responsive'>
     <table className="table table-bordered mt-3">
        <thead>
          <tr>
            {
                columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                ))
            }
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {
                    columns.map((column) => (
                     <td key={column.key}>{String(row[column.key as keyof T])}</td> 
                    ))
                }
                {actions && <td>{actions(row)}</td>}   
              </tr>
            )) 
          }
        </tbody>
      </table>
    </div>
  );
};

export default CadreTab;
