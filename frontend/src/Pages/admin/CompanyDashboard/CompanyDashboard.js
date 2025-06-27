import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import AdminNavbar from '../../../Components/Admin_components/layout/AdminNavbar';
import CompanySidebar from '../../../Components/Admin_components/layout/AdminCompanySidebar'; // New component
import './CompanyDashboard.css';

const CompanyDashboard = () => {
  const { companyId } = useParams();

  return (
    <div className="company-layout">
      <CompanySidebar companyId={companyId} />
      <div className="company-main">
        <AdminNavbar />
        <div className="company-content">
          <Outlet /> {/* This renders nested routes */}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;