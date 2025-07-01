import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComapnyLayout from '../layouts/ComapnyLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import CompanyDetails from '../pages/company/CompanyDetails/ComapanyDetails';
import ChangeCompanyPassword from '../pages/company/ChangePassword/ChangePassword';
import CustomerPage from '../pages/company/Customers/Customers';
import AddCustomer from '../pages/company/Customers/AddCustomers/AddCustomers';
import SupplierList from '../pages/company/Suppliers/Suppliers';
import AddSupplier from '../pages/company/Suppliers/AddSuppliers/AddSuppliers';
import AccountGroupList from '../pages/company/AccountingGroup/AccountingGroup';
import CreateAccountGroup from '../pages/company/AccountingGroup/AddAccountingGroup/AddAccountingGroup';
import LedgerForm from '../pages/company/AccountLedger/AddAccountLedger/AddAccountLedger';
import LedgerListPage from '../pages/company/AccountLedger/AccountLedger';
import VoucherTypeListPage from '../pages/company/Voucher/VoucherTypes';
import VoucherTypeForm from '../pages/company/Voucher/AddVoucher/AddVoucher';

function AdminRoutes() {
  return (
    <ComapnyLayout>
      <Routes>
        <Route path='/:companyid/dashboard' element={<Dashboard />} />
        <Route path='/details' element={<CompanyDetails />} />
        <Route path='/change-password' element={<ChangeCompanyPassword />} />
        <Route path='/master/customers' element={<CustomerPage />} />
        <Route path='/masters/customers/add' element={<AddCustomer />} />
        <Route path='/master/suppliers' element={<SupplierList />} />
        <Route path='/master/suppliers/add' element={<AddSupplier />} />
        <Route path='/master/account-group' element={<AccountGroupList />} />
        <Route path='/master/account-groups/add' element={<CreateAccountGroup />} />
        <Route path='/master/account-ledger' element={<LedgerListPage />} />
        <Route path='/master/ledgers/create' element={<LedgerForm />} />
        <Route path='/master/voucher-type' element={<VoucherTypeListPage />} />
        <Route path='/master/voucher-type/add' element={<VoucherTypeForm />} />



        /company/master/ledgers/create






      </Routes>
    </ComapnyLayout>
  );
}

export default AdminRoutes;