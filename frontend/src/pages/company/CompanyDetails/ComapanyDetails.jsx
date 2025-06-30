import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaBuilding, FaEdit, FaSave, FaTimes, FaGlobe, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './CompanyDetails.css';

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'Tech Solutions Inc.',
    registrationNumber: 'CMP2023001',
    financialYear: '2023-2024',
    industry: 'Information Technology',
    address: '123 Tech Park, Silicon Valley, CA 94025',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    email: 'info@techsolutions.com',
    website: 'www.techsolutions.com',
    taxId: 'TAX-US-123456789',
    currency: 'USD',
    timezone: 'PST (UTC-8)',
    logo: '💻' // Can be replaced with actual image URL
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Add API call to save data here
    setIsEditing(false);
    console.log('Company data saved:', companyData);
  };

  return (
    <div className="company-details-container">
      <div className="details-header">
        <div className="company-logo">
          <div className="logo-placeholder">
            {companyData.logo}
          </div>
        </div>
        <div className="company-title">
          <h1>{companyData.name}</h1>
          <p className="company-id">Company ID: {companyId}</p>
        </div>
        <div className="action-buttons">
          {isEditing ? (
            <>
              <button className="btn-save" onClick={handleSave}>
                <FaSave /> Save
              </button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit
            </button>
          )}
        </div>
      </div>

      <div className="details-content">
        <div className="details-section">
          <h2>Basic Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <label>Company Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.name}</p>
              )}
            </div>
            <div className="detail-item">
              <label>Registration Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="registrationNumber"
                  value={companyData.registrationNumber}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.registrationNumber}</p>
              )}
            </div>
            <div className="detail-item">
              <label>Financial Year</label>
              {isEditing ? (
                <input
                  type="text"
                  name="financialYear"
                  value={companyData.financialYear}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.financialYear}</p>
              )}
            </div>
            <div className="detail-item">
              <label>Industry</label>
              {isEditing ? (
                <input
                  type="text"
                  name="industry"
                  value={companyData.industry}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.industry}</p>
              )}
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Contact Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <label><FaMapMarkerAlt /> Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={companyData.address}
                  onChange={handleInputChange}
                  rows="3"
                />
              ) : (
                <p>{companyData.address}</p>
              )}
            </div>
            <div className="detail-item">
              <label><FaGlobe /> Country</label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={companyData.country}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.country}</p>
              )}
            </div>
            <div className="detail-item">
              <label><FaPhone /> Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={companyData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.phone}</p>
              )}
            </div>
            <div className="detail-item">
              <label><FaEnvelope /> Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={companyData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.email}</p>
              )}
            </div>
            <div className="detail-item">
              <label><FaGlobe /> Website</label>
              {isEditing ? (
                <input
                  type="url"
                  name="website"
                  value={companyData.website}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.website}</p>
              )}
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Financial Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <label>Tax ID</label>
              {isEditing ? (
                <input
                  type="text"
                  name="taxId"
                  value={companyData.taxId}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.taxId}</p>
              )}
            </div>
            <div className="detail-item">
              <label>Base Currency</label>
              {isEditing ? (
                <select
                  name="currency"
                  value={companyData.currency}
                  onChange={handleInputChange}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              ) : (
                <p>{companyData.currency}</p>
              )}
            </div>
            <div className="detail-item">
              <label>Timezone</label>
              {isEditing ? (
                <select
                  name="timezone"
                  value={companyData.timezone}
                  onChange={handleInputChange}
                >
                  <option value="PST (UTC-8)">PST (UTC-8)</option>
                  <option value="EST (UTC-5)">EST (UTC-5)</option>
                  <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                  <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
                </select>
              ) : (
                <p>{companyData.timezone}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;