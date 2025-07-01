import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AccountingGroup.css';

const CreateAccountGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupCode: '',
    groupName: '',
    groupType: 'Assets',
    parentGroup: '',
    description: ''
  });

  const groupTypes = ['Assets', 'Liabilities', 'Income', 'Expenses'];
  const parentGroups = {
    'Assets': ['Current Assets', 'Fixed Assets', 'Investments'],
    'Liabilities': ['Current Liabilities', 'Long Term Liabilities'],
    'Income': ['Direct Income', 'Indirect Income'],
    'Expenses': ['Direct Expenses', 'Indirect Expenses']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will go here
    console.log('Account Group Created:', formData);
    navigate('/account-groups');
  };

  return (
    <div className="account-group-form-page">
      <h2>{formData.id ? 'Edit' : 'Create'} Account Group</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Group Code*</label>
              <input
                type="text"
                name="groupCode"
                value={formData.groupCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Group Name*</label>
              <input
                type="text"
                name="groupName"
                value={formData.groupName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Group Type*</label>
              <select
                name="groupType"
                value={formData.groupType}
                onChange={handleInputChange}
                required
              >
                {groupTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Parent Group</label>
              <select
                name="parentGroup"
                value={formData.parentGroup}
                onChange={handleInputChange}
              >
                <option value="">-- Select Parent Group --</option>
                {parentGroups[formData.groupType]?.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
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
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/account-groups')}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            {formData.id ? 'Update' : 'Create'} Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountGroup;