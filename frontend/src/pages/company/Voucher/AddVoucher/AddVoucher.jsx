import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Voucher.css';

const VoucherTypeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    voucherName: '',
    numberingMethod: 'Auto',
    voucherType: 'Payment',
    narration: '',
    isActive: true
  });

  const voucherTypes = [
    'Payment', 'Receipt', 'Journal', 'Contra', 'Sales', 'Purchase'
  ];

  const numberingMethods = [
    'Auto', 'Manual', 'Auto with Prefix', 'Auto with Suffix'
  ];

  useEffect(() => {
    if (id) {
      const fetchVoucherType = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setFormData({
          voucherName: 'Payment Voucher',
          numberingMethod: 'Auto',
          voucherType: 'Payment',
          narration: 'For recording all payment transactions',
          isActive: true
        });
        
        setIsLoading(false);
      };
      
      fetchVoucherType();
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
    navigate('/voucher-types');
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading voucher type...</div>;
  }

  return (
    <div className="accounting-form-page">
      <h2>{id ? 'Edit' : 'Create'} Voucher Type</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Voucher Name*</label>
              <input
                type="text"
                name="voucherName"
                value={formData.voucherName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Numbering Method*</label>
              <select
                name="numberingMethod"
                value={formData.numberingMethod}
                onChange={handleInputChange}
                required
              >
                {numberingMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Voucher Type*</label>
              <select
                name="voucherType"
                value={formData.voucherType}
                onChange={handleInputChange}
                required
              >
                {voucherTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
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

          <div className="form-group">
            <label>Default Narration</label>
            <textarea
              name="narration"
              value={formData.narration}
              onChange={handleInputChange}
              rows="3"
              placeholder="Default description for this voucher type"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="accounting-btn accounting-btn-secondary"
            onClick={() => navigate('/voucher-types')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="accounting-btn accounting-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (id ? 'Update' : 'Create')} Voucher Type
          </button>
        </div>
      </form>
    </div>
  );
};

export default VoucherTypeForm;