import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComapnyLayout from '../layouts/ComapnyLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import CompanyDetails from '../pages/company/CompanyDetails/ComapanyDetails';
import ChangeCompanyPassword from '../pages/company/ChangePassword/ChangePassword';
import CustomerPage from '../pages/company/Masters/Customers/Customers';
import AddCustomer from '../pages/company/Masters/Customers/AddCustomers/AddCustomers';
import SupplierList from '../pages/company/Masters/Suppliers/Suppliers';
import AddSupplier from '../pages/company/Masters/Suppliers/AddSuppliers/AddSuppliers';
import AccountGroupList from '../pages/company/Masters/AccountingGroup/AccountingGroup';
import CreateAccountGroup from '../pages/company/Masters/AccountingGroup/AddAccountingGroup/AddAccountingGroup';
import LedgerForm from '../pages/company/Masters/AccountLedger/AddAccountLedger/AddAccountLedger';
import LedgerListPage from '../pages/company/Masters/AccountLedger/AccountLedger';
import VoucherTypeListPage from '../pages/company/Masters/Voucher/VoucherTypes';
import VoucherTypeForm from '../pages/company/Masters/Voucher/AddVoucher/AddVoucher';
import CurrencyListPage from '../pages/company/Masters/Currency/CurrencyPage';
import CategoryListPage from '../pages/company/Product_Services/Catogeries/Catogeries';
import CategoryForm from '../pages/company/Product_Services/Catogeries/AddCatogeries/AddCatogeries';
import ProductForm from '../pages/company/Product_Services/ProductCreation/AddProduct/AddProduct';
import ProductListPage from '../pages/company/Product_Services/ProductCreation/Product';
import BrandListPage from '../pages/company/Product_Services/Brands/Brands';
import BrandForm from '../pages/company/Product_Services/Brands/AddBrands/AddBrands';
import UnitsListPage from '../pages/company/Product_Services/Units/Units';
import UnitForm from '../pages/company/Product_Services/Units/AddUnits/AddUnits';
import TaxesListPage from '../pages/company/Product_Services/Taxes/Taxes';
import TaxForm from '../pages/company/Product_Services/Taxes/AddTaxes/AddTaxes';
import PriceListForm from '../pages/company/PriceListPage/AddPriceList/AddPriceList';
import PriceListPage from '../pages/company/PriceListPage/PriceList';
import PurchaseQuotationList from '../pages/company/Purchases/PurchaseQuotation/PurchaseQuotation';
import CreatePurchaseQuotation from '../pages/company/Purchases/PurchaseQuotation/AddPurchaseQuotation/AddPurchaseQuotation';
import PurchaseOrderList from '../pages/company/Purchases/PurchaseOrders/PurchaseOrders';
import CreatePurchaseOrder from '../pages/company/Purchases/PurchaseOrders/AddPurchaseOrder/AddPurchase';
import PurchaseInvoiceList from '../pages/company/Purchases/PurchaseInvoice/PurchaseInvoice';
import CreatePurchaseInvoice from '../pages/company/Purchases/PurchaseInvoice/AddPurchaseInvoice';
import PurchaseReturnList from '../pages/company/Purchases/PurchaseReturn/PurchaseReturn';
import CreatePurchaseReturn from '../pages/company/Purchases/PurchaseReturn/AddPurchaseReturn';
import QuotationView from '../pages/company/Sales/SalesQuatation/SalesQuatation';
import QuotationCreate from '../pages/company/Sales/SalesQuatation/AddSalesQuatation/AddSalesQuatation';
import SalesInvoiceCreate from '../pages/company/Sales/SalesInvoice/AddSalesInvoice';
import InvoiceView from '../pages/company/Sales/SalesInvoice/SalesInvoice';
import OrderView from '../pages/company/Sales/SalesOrders/SalesOrders';
import SalesOrderCreate from '../pages/company/Sales/SalesOrders/AddSalesOrder/AddSalesOrder';
import ReturnView from '../pages/company/Sales/SalesReturn/SalesReturn';
import SalesReturnCreate from '../pages/company/Sales/SalesReturn/AddSalesReturn/AddSalesReturn';
import BankReconciliation from '../pages/company/Transactions/BankReconciliation/BankReconciliation';
import JournalVoucher from '../pages/company/Transactions/JournalVoucher/JournalVoucher';
import PaymentVoucher from '../pages/company/Transactions/Paymentvoucher.css/Paymentvoucher';
import ReceiptVoucher from '../pages/company/Transactions/ReciptVoucher/ReciptVoucher';
import BalanceSheet from '../pages/company/FinacialStatements/BalanceSheet/BalanceSheet';
import ProfitAndLoss from '../pages/company/FinacialStatements/ProfitAndLoss/ProfitAndLoss';
import ChartOfAccounts from '../pages/company/FinacialStatements/ChartOfAccounts/ChartOfAccounts';

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
        <Route path='/master/currency/add' element={<VoucherTypeForm />} />
        <Route path='/master/currency' element={<CurrencyListPage />} />


        <Route path='/products/categories' element={<CategoryListPage />} />
        <Route path='/product-services/categories/create' element={<CategoryForm />} />
        <Route path='/products/creation' element={<ProductListPage />} />
        <Route path='/products/product/create' element={<ProductForm />} />

        <Route path='/products/brands' element={<BrandListPage />} />
        <Route path='/products/brands/add' element={<BrandForm />} />
        <Route path='products/units' element={<UnitsListPage />} />
        <Route path='products/units/add' element={<UnitForm />} />
        <Route path='/products/Taxes' element={<TaxesListPage />} />
        <Route path='/products/taxes/create' element={<TaxForm />} />
        <Route path='products/units/add' element={<UnitForm />} />
        <Route path='/products/Purchase-Price-List' element={<PriceListPage />} />
        <Route path='/products/Purchase-Price-List/create' element={<PriceListForm />} />

        <Route path='/purchases/quotation' element={<PurchaseQuotationList />} />
        <Route path='/purchases/quotation/create' element={<CreatePurchaseQuotation />} />
        <Route path='/purchases/orders' element={<PurchaseOrderList />} />
        <Route path='/purchases/orders/create' element={<CreatePurchaseOrder />} />
        <Route path='/purchases/invoice' element={<PurchaseInvoiceList />} />
        <Route path='/purchases/invoice/create' element={<CreatePurchaseInvoice />} />
        <Route path='/purchases/return' element={<PurchaseReturnList />} />
        <Route path='/purchases/return/create' element={<CreatePurchaseReturn />} />

        <Route path='/sales/quotation' element={<QuotationView />} />
        <Route path='/sales/quotation/create' element={<QuotationCreate />} />
        <Route path='/sales/invoices/' element={< InvoiceView/>} />
        <Route path='/sales/invoice/create' element={<SalesInvoiceCreate />} />
        <Route path='/sales/orders/' element={<OrderView />} />
        <Route path='/sales/orders/create' element={<SalesOrderCreate />} />
        <Route path='/sales/return/' element={<ReturnView />} />
        <Route path='/sales/return/create' element={<SalesReturnCreate />} />

        <Route path='/transactions/bank-reconciliation' element={<BankReconciliation />} />
        <Route path='/transactions/journal-voucher' element={<JournalVoucher />} />
        <Route path='/transactions/payment-voucher' element={<PaymentVoucher />} />
        <Route path='/transactions/receipt-voucher' element={<ReceiptVoucher />} />

        <Route path='/financial/balance-sheet' element={<BalanceSheet />} />
        <Route path='financial/profit-loss' element={<ProfitAndLoss />} />
        <Route path='/financial/chart-of-accounts' element={<ChartOfAccounts />} />















      </Routes>
    </ComapnyLayout>
  );
}

export default AdminRoutes;