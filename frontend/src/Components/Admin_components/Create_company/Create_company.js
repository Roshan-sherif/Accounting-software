import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiCalendar, FiDollarSign, FiMapPin, FiInfo } from 'react-icons/fi';
import './CreateCompany.css'
import axios from 'axios'
const CompanyEntry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    financialYear: '2023-2024',
    baseCurrency: 'INR',
    taxId: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
    email: '',
    website: '',
    businessType: 'Private Limited',
    industry: 'Accounting',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Company created:', formData);
    const Responce= await axios.post('http://localhost:5000/' ,formData)
    console.log(Responce)
    navigate('/admin/dashboard');
  };

  return (
    <motion.div 
      className="company-entry"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="form-header">
        <h2><FiInfo /> Company Details</h2>
        <p>Enter all required information for your company</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Legal Name</label>
              <input
                type="text"
                name="legalName"
                value={formData.legalName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Financial Year *</label>
              <div className="input-with-icon">
                <FiCalendar />
                <select
                  name="financialYear"
                  value={formData.financialYear}
                  onChange={handleChange}
                  required
                >
                  <option value="2023-2024">2023-2024</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2021-2022">2021-2022</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Base Currency *</label>
              <div className="input-with-icon">
                <FiDollarSign />
                <select
                  name="baseCurrency"
                  value={formData.baseCurrency}
                  onChange={handleChange}
                  required
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Business Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
              >
                <option value="Private Limited">Private Limited</option>
                <option value="Public Limited">Public Limited</option>
                <option value="Partnership">Partnership</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="LLP">LLP</option>
              </select>
            </div>
            <div className="form-group">
              <label>Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              >
                <option value="Accounting">Accounting</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Services">Services</option>
                <option value="IT">Information Technology</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Tax Identification Number</label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder="GSTIN/PAN/etc."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate(-1)}>
            <FiX /> Cancel
          </button>
          <button type="submit" className="primary-btn">
            <FiSave /> Save Company Details
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CompanyEntry;