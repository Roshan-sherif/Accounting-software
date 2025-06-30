import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComapnyLayout from '../layouts/ComapnyLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';

function AdminRoutes() {
  return (
    <ComapnyLayout>
      <Routes>
        <Route path='/:companyid/dashboard' element= {<Dashboard/>}/>
      </Routes>
    </ComapnyLayout>
  );
}

export default AdminRoutes;