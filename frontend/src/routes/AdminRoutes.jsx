import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import CreateCompany from '../pages/admin/CreateCompany/Create_company'
import SelectCompany from '../pages/admin/SelectCompany/SelectComapny'

function AdminRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element= {<Dashboard/>}/>
        <Route path='/company/create' element= {<CreateCompany/>}/>
        <Route path='/company/select' element={<SelectCompany/>}/>

      </Routes>
    </MainLayout>
  );
}

export default AdminRoutes;