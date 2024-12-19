import React from 'react';


const RobinetPublicForm: React.FC = () => {

  return (
    <form className='mt-4'>
        <div className="mb-3">
            <input
              className="form-control rounded-0 border-none border-bottom"
              type="number"
              placeholder="10.000f"
              required
            />
        </div>
        <div className="mb-3">
            <input
              className="form-control rounded-0"
              type="number"
              placeholder="numero bénéficiare"
              required
            />
        </div>
        <div className='mb-3'>
          <button type="submit" className='btn btn-success form-control'>
            Envoyer
          </button>
        </div>
    </form>
  );
};

export default RobinetPublicForm;
