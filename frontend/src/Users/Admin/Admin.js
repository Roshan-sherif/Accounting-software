import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/admin/Dashboard';
import CompanyEntry from '../../Pages/admin/Create_company/Create_company';

const Admin = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/company/create" element={< CompanyEntry/>} />
    </Routes>
  );
};

export default Admin;