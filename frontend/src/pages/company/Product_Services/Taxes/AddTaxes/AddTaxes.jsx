import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rate: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    navigate('/taxes');
  };

  return (
    <div className="container">
      <h2>Create Tax</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tax Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Tax Value (%)</label>
          <input
            type="number"
            value={formData.rate}
            onChange={(e) => setFormData({...formData, rate: e.target.value})}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <div className="status-toggle">
            <button
              type="button"
              className={`toggle-btn ${formData.status === 'Active' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, status: 'Active'})}
            >
              Active
            </button>
            <button
              type="button"
              className={`toggle-btn ${formData.status === 'Inactive' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, status: 'Inactive'})}
            >
              Inactive
            </button>
          </div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/taxes')} className="btn-secondary">
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

export default TaxForm;