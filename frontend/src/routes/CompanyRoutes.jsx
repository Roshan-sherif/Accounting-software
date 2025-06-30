import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComapnyLayout from '../layouts/ComapnyLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import CompanyDetails from '../pages/company/CompanyDetails/ComapanyDetails';
import ChangeCompanyPassword from '../pages/company/ChangePassword/ChangePassword';
import CustomerPage from '../pages/company/Customers/Customers';

function AdminRoutes() {
  return (
    <ComapnyLayout>
      <Routes>
        <Route path='/:companyid/dashboard' element= {<Dashboard/>}/>
        <Route path='/details' element= {<CompanyDetails/>}/>
        <Route path='/change-password' element={<ChangeCompanyPassword/>}/>
                <Route path='/master/customers' element={<CustomerPage/>}/>



      </Routes>
    </ComapnyLayout>
  );
}

export default AdminRoutes;