import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Brands.css';

const BrandForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    description: '',
    status: 'Active'
  });

  useEffect(() => {
    if (id) {
      const fetchBrand = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setFormData({
          name: 'TechPro',
          manufacturer: 'TechPro Inc.',
          description: 'Electronics manufacturer',
          status: 'Active'
        });
        
        setIsLoading(false);
      };
      
      fetchBrand();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Brand submitted:', formData);
    setIsSubmitting(false);
    navigate('/brands');
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading brand data...</div>;
  }

  return (
    <div className="accounting-form-page">
      <h2>{id ? 'Edit' : 'Create'} Brand</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Brand Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <div className="status-toggle">
              <button
                type="button"
                className={`toggle-btn ${formData.status === 'Active' ? 'active' : ''}`}
                onClick={() => handleStatusChange('Active')}
              >
                Active
              </button>
              <button
                type="button"
                className={`toggle-btn ${formData.status === 'Inactive' ? 'active' : ''}`}
                onClick={() => handleStatusChange('Inactive')}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="accounting-btn accounting-btn-secondary"
            onClick={() => navigate('/brands')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="accounting-btn accounting-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (id ? 'Update' : 'Create')} Brand
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;