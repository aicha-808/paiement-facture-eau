import React from 'react';


const CompteurForm: React.FC = () => {

  return (
    <form>
        <div className="mb-3">
            <input
              className="form-control rounded-0"
              type="text"
              placeholder="2 m3"
              // value={formData.nom}
              // onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
        </div>
        <div className="mb-3">
            <input
              className="form-control rounded-0"
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

export default CompteurForm;
