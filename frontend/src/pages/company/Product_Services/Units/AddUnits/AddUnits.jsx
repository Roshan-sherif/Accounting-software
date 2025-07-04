import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UnitForm = () => {
  const navigate = useNavigate();
  const [unitName, setUnitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    navigate('/units');
  };

  return (
    <div className="container">
      <h2>Create Unit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Unit Name</label>
          <input
            type="text"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/units')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnitForm;