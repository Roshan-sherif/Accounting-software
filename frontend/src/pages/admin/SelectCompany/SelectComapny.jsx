import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectCompany.css';

const SelectCompany = () => {
  const navigate = useNavigate();
  const [companies] = useState([
    { id: 'CMP001', name: 'Tech Solutions Ltd.', fy: '2023-2024', active: true },
    { id: 'CMP002', name: 'Global Retail Inc.', fy: '2023-2024', active: false },
    { id: 'CMP003', name: 'Blue Horizon Finance', fy: '2024-2025', active: true },
    { id: 'CMP004', name: 'Urban Design Studio', fy: '2022-2023', active: false },
  ]);

  const handleCompanyClick = (companyId) => {
    // Navigate to company dashboard page
    navigate(`/company/${companyId}/dashboard`);
  };

  return (
    <div className="company-select-container">
      <div className="company-select-header">
        <h2>Select Company</h2>
      </div>

      <div className="company-list">
        {companies.map((company) => (
          <div 
            key={company.id}
            className={`company-card ${company.active ? 'active' : ''}`}
            onClick={() => handleCompanyClick(company.id)}
          >
            <div className="company-info">
              <div className="company-name">{company.name}</div>
              <div className="company-details">
                <span>ID: {company.id}</span>
                <span>FY: {company.fy}</span>
              </div>
            </div>
            {company.active && <div className="active-badge">Active</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCompany;