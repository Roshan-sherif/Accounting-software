import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/admin/Dashboard';
import CompanyEntry from '../../Pages/admin/Create_company/Create_company';
import AdminNavbar from '../../Components/Admin_components/layout/AdminNavbar';
import CompanyDashboard from '../../Pages/admin/CompanyDashboard/CompanyDashboard';

const Admin = () => {
  return (
    <div>
      <div className=''>
    <Routes>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/company/create" element={< CompanyEntry/>} />
            <Route path="/company/:companyId/" element={<CompanyDashboard />} />

    </Routes>

      </div>

    </div>
  );
};

export default Admin;