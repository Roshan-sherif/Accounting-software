import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Catogeries.css';

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setFormData({
          name: 'Electronics',
          description: 'Electronic devices and components',
          isActive: true
        });
        
        setIsLoading(false);
      };
      
      fetchCategory();
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
    navigate('/categories');
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading category...</div>;
  }

  return (
    <div className="accounting-form-page">
      <h2>{id ? 'Edit' : 'Create'} Product Category</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Category Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Electronics, Office Supplies"
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
              placeholder="Brief description about this category"
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
            onClick={() => navigate('/categories')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="accounting-btn accounting-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (id ? 'Update' : 'Create')} Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;