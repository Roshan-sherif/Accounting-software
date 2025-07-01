import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CurrencyPage.css';

const CurrencyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimalPlaces: 2,
    subUnit: '',
    narration: '',
    isActive: true
  });

  useEffect(() => {
    if (id) {
      const fetchCurrency = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setFormData({
          name: 'US Dollar',
          symbol: '$',
          decimalPlaces: 2,
          subUnit: 'Cent',
          narration: 'Primary transaction currency',
          isActive: true
        });
        
        setIsLoading(false);
      };
      
      fetchCurrency();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    navigate('/currencies');
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading currency...</div>;
  }

  return (
    <div className="accounting-form-page">
      <h2>{id ? 'Edit' : 'Create'} Currency</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Currency Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Symbol*</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                required
                maxLength="3"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Decimal Places*</label>
              <select
                name="decimalPlaces"
                value={formData.decimalPlaces}
                onChange={handleInputChange}
                required
              >
                <option value="0">0 (Whole numbers)</option>
                <option value="2">2 (Standard)</option>
                <option value="3">3 (Precision)</option>
                <option value="4">4 (High precision)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sub Unit Name</label>
              <input
                type="text"
                name="subUnit"
                value={formData.subUnit}
                onChange={handleInputChange}
                placeholder="e.g., Cent, Paisa, Penny"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Narration</label>
            <textarea
              name="narration"
              value={formData.narration}
              onChange={handleInputChange}
              rows="3"
              placeholder="Description about this currency"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              <label htmlFor="isActive">
                {formData.isActive ? 'Active' : 'Inactive'}
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="accounting-btn accounting-btn-secondary"
            onClick={() => navigate('/currencies')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="accounting-btn accounting-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (id ? 'Update' : 'Create')} Currency
          </button>
        </div>
      </form>
    </div>
  );
};

export default CurrencyForm;