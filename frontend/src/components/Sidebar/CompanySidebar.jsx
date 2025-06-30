import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUsers, FaBuilding, FaBook, 
  FaBoxes, FaPercentage, FaShoppingCart, 
  FaFileInvoiceDollar, FaExchangeAlt, FaFileAlt, 
  FaChartLine, FaCog, FaChevronDown, FaChevronRight 
} from 'react-icons/fa';
import './CompanySidebar.css';

const CompanySidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    users: false,
    company: false,
    master: false,
    products: false,
    taxes: false,
    purchases: false,
    sales: false,
    transactions: false,
    financial: false,
    reports: false,
    settings: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className="company-sidebar">
      {/* Fixed Header */}
      <div className="sidebar-header">
        <h2>Company Name</h2>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="sidebar-scrollable">
        <nav>
          {/* Dashboard */}
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
          >
            <FaTachometerAlt className="icon" />
            <span>Dashboard</span>
          </NavLink>

          {/* Manage Users */}
          <div className={`menu-item ${openMenus.users ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('users')}>
              <FaUsers className="icon" />
              <span>Manage Users</span>
              {openMenus.users ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/users/all" className={({ isActive }) => isActive ? 'active' : ''}>
                All Users
              </NavLink>
              <NavLink to="/users/create" className={({ isActive }) => isActive ? 'active' : ''}>
                Create User
              </NavLink>
            </div>
          </div>

          {/* Company */}
          <div className={`menu-item ${openMenus.company ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('company')}>
              <FaBuilding className="icon" />
              <span>Company</span>
              {openMenus.company ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/details" className={({ isActive }) => isActive ? 'active' : ''}>
                Company Details
              </NavLink>
              <NavLink to="/company/change-password" className={({ isActive }) => isActive ? 'active' : ''}>
                Change Password
              </NavLink>
            </div>
          </div>

          {/* Master Data */}
          <div className={`menu-item ${openMenus.master ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('master')}>
              <FaBook className="icon" />
              <span>Master Data</span>
              {openMenus.master ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/master/customers" className={({ isActive }) => isActive ? 'active' : ''}>
                Customers
              </NavLink>
              <NavLink to="/company/master/suppliers" className={({ isActive }) => isActive ? 'active' : ''}>
                Suppliers
              </NavLink>
              <NavLink to="/company/master/account-group" className={({ isActive }) => isActive ? 'active' : ''}>
                Account Group
              </NavLink>
              <NavLink to="/company/master/account-ledger" className={({ isActive }) => isActive ? 'active' : ''}>
                Account Ledger
              </NavLink>
              <NavLink to="/company/master/voucher-type" className={({ isActive }) => isActive ? 'active' : ''}>
                Voucher Type
              </NavLink>
              <NavLink to="/company/master/currency" className={({ isActive }) => isActive ? 'active' : ''}>
                Currency
              </NavLink>
            </div>
          </div>

          {/* Products & Services */}
          <div className={`menu-item ${openMenus.products ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('products')}>
              <FaBoxes className="icon" />
              <span>Products & Services</span>
              {openMenus.products ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/products/categories" className={({ isActive }) => isActive ? 'active' : ''}>
                Categories
              </NavLink>
              <NavLink to="/company/products/creation" className={({ isActive }) => isActive ? 'active' : ''}>
                Product Creation
              </NavLink>
              <NavLink to="/company/products/brands" className={({ isActive }) => isActive ? 'active' : ''}>
                Brands
              </NavLink>
              <NavLink to="/company/products/units" className={({ isActive }) => isActive ? 'active' : ''}>
                Units
              </NavLink>
            </div>
          </div>

          {/* Taxes */}
          <div className={`menu-item ${openMenus.taxes ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('taxes')}>
              <FaPercentage className="icon" />
              <span>Taxes</span>
              {openMenus.taxes ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/taxes/setup" className={({ isActive }) => isActive ? 'active' : ''}>
                Tax Setup
              </NavLink>
              <NavLink to="/company/taxes/purchase-price-list" className={({ isActive }) => isActive ? 'active' : ''}>
                Purchase Price List
              </NavLink>
            </div>
          </div>

          {/* Purchases */}
          <div className={`menu-item ${openMenus.purchases ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('purchases')}>
              <FaShoppingCart className="icon" />
              <span>Purchases</span>
              {openMenus.purchases ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/purchases/quotation" className={({ isActive }) => isActive ? 'active' : ''}>
                Purchase Quotation
              </NavLink>
              <NavLink to="/company/purchases/orders" className={({ isActive }) => isActive ? 'active' : ''}>
                Purchase Orders
              </NavLink>
              <NavLink to="/company/purchases/invoice" className={({ isActive }) => isActive ? 'active' : ''}>
                Purchase Invoice
              </NavLink>
              <NavLink to="/company/purchases/return" className={({ isActive }) => isActive ? 'active' : ''}>
                Purchase Return
              </NavLink>
            </div>
          </div>

          {/* Sales */}
          <div className={`menu-item ${openMenus.sales ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('sales')}>
              <FaFileInvoiceDollar className="icon" />
              <span>Sales</span>
              {openMenus.sales ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/sales/quotation" className={({ isActive }) => isActive ? 'active' : ''}>
                Sales Quotation
              </NavLink>
              <NavLink to="/company/sales/orders" className={({ isActive }) => isActive ? 'active' : ''}>
                Sales Orders
              </NavLink>
              <NavLink to="/company/sales/invoices" className={({ isActive }) => isActive ? 'active' : ''}>
                Sales Invoices
              </NavLink>
              <NavLink to="/company/sales/return" className={({ isActive }) => isActive ? 'active' : ''}>
                Sales Return
              </NavLink>
            </div>
          </div>

          {/* Transactions */}
          <div className={`menu-item ${openMenus.transactions ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('transactions')}>
              <FaExchangeAlt className="icon" />
              <span>Transactions</span>
              {openMenus.transactions ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/transactions/bank-reconciliation" className={({ isActive }) => isActive ? 'active' : ''}>
                Bank Reconciliation
              </NavLink>
              <NavLink to="/company/transactions/journal-voucher" className={({ isActive }) => isActive ? 'active' : ''}>
                Journal Voucher
              </NavLink>
              <NavLink to="/company/transactions/payment-voucher" className={({ isActive }) => isActive ? 'active' : ''}>
                Payment Voucher
              </NavLink>
              <NavLink to="/company/transactions/receipt-voucher" className={({ isActive }) => isActive ? 'active' : ''}>
                Receipt Voucher
              </NavLink>
            </div>
          </div>

          {/* Financial Statements */}
          <div className={`menu-item ${openMenus.financial ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('financial')}>
              <FaFileAlt className="icon" />
              <span>Financial Statements</span>
              {openMenus.financial ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/financial/balance-sheet" className={({ isActive }) => isActive ? 'active' : ''}>
                Balance Sheet
              </NavLink>
              <NavLink to="/company/financial/profit-loss" className={({ isActive }) => isActive ? 'active' : ''}>
                Profit & Loss
              </NavLink>
              <NavLink to="/company/financial/chart-of-accounts" className={({ isActive }) => isActive ? 'active' : ''}>
                Chart of Accounts
              </NavLink>
            </div>
          </div>

          {/* Reports */}
          <div className={`menu-item ${openMenus.reports ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('reports')}>
              <FaChartLine className="icon" />
              <span>Reports</span>
              {openMenus.reports ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/reports/ledger" className={({ isActive }) => isActive ? 'active' : ''}>
                Account Ledger Report
              </NavLink>
              <NavLink to="/company/reports/payment" className={({ isActive }) => isActive ? 'active' : ''}>
                Payment Report
              </NavLink>
              <NavLink to="/company/reports/receipt" className={({ isActive }) => isActive ? 'active' : ''}>
                Receipt Report
              </NavLink>
              <NavLink to="/company/reports/journal" className={({ isActive }) => isActive ? 'active' : ''}>
                Journal Report
              </NavLink>
              <NavLink to="/company/reports/purchase-invoice" className={({ isActive }) => isActive ? 'active' : ''}>
                Purchase Invoice Report
              </NavLink>
              <NavLink to="/company/reports/purchase-return" className={({ isActive }) => isActive ? 'active' : ''}>
                Purchase Return Report
              </NavLink>
              <NavLink to="/company/reports/sales-invoice" className={({ isActive }) => isActive ? 'active' : ''}>
                Sales Invoice Report
              </NavLink>
              <NavLink to="/company/reports/sales-return" className={({ isActive }) => isActive ? 'active' : ''}>
                Sales Return Report
              </NavLink>
              <NavLink to="/company/reports/stock" className={({ isActive }) => isActive ? 'active' : ''}>
                Stock Report
              </NavLink>
            </div>
          </div>

          {/* Settings */}
          <div className={`menu-item ${openMenus.settings ? 'open' : ''}`}>
            <div className="menu-title" onClick={() => toggleMenu('settings')}>
              <FaCog className="icon" />
              <span>Settings</span>
              {openMenus.settings ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div className="submenu">
              <NavLink to="/company/settings/email" className={({ isActive }) => isActive ? 'active' : ''}>
                Email Config
              </NavLink>
              <NavLink to="/company/settings/user-creation" className={({ isActive }) => isActive ? 'active' : ''}>
                User Creation
              </NavLink>
              <NavLink to="/company/settings/bank-accounts" className={({ isActive }) => isActive ? 'active' : ''}>
                Bank Accounts
              </NavLink>
              <NavLink to="/company/settings/financial-year" className={({ isActive }) => isActive ? 'active' : ''}>
                Financial Year
              </NavLink>
              <NavLink to="/company/settings/countries" className={({ isActive }) => isActive ? 'active' : ''}>
                Countries
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CompanySidebar;