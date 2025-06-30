import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

const ChangeCompanyPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.currentPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password changed:', formData);
      setIsSubmitting(false);
      setSuccessMessage('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        navigate(-1); // Go back to previous page
      }, 3000);
    }, 1500);
  };

  return (
    <div className="change-password-container">
      <div className="password-card">
        <div className="password-header">
          <FaLock className="lock-icon" />
          <h2>Change Company Password</h2>
          <p>Secure your company account with a new password</p>
        </div>
        
        {successMessage && (
          <div className="success-message">
            <FaCheck className="success-icon" />
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.currentPassword ? 'error' : ''}`}>
            <label htmlFor="currentPassword">Current Password</label>
            <div className="password-input">
              <input
                type={showPassword.current ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => toggleShowPassword('current')}
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <div className="error-message">
                <FaTimes className="error-icon" /> {errors.currentPassword}
              </div>
            )}
          </div>
          
          <div className={`form-group ${errors.newPassword ? 'error' : ''}`}>
            <label htmlFor="newPassword">New Password</label>
            <div className="password-input">
              <input
                type={showPassword.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => toggleShowPassword('new')}
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <div className="error-message">
                <FaTimes className="error-icon" /> {errors.newPassword}
              </div>
            )}
            <div className="password-strength">
              Password must be at least 8 characters long
            </div>
          </div>
          
          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="password-input">
              <input
                type={showPassword.confirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => toggleShowPassword('confirm')}
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="error-message">
                <FaTimes className="error-icon" /> {errors.confirmPassword}
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeCompanyPassword;