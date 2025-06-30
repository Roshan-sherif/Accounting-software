import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import CreateCompany from '../pages/admin/CreateCompany/Create_company'

function AdminRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/admin' element= {<Dashboard/>}/>
        <Route path='/admin/company/create' element= {<CreateCompany/>}/>

      </Routes>
    </MainLayout>
  );
}

export default AdminRoutes;