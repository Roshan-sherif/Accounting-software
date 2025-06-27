import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { 
  FaBook, FaUsers, FaBoxes, FaShoppingCart, FaFileInvoiceDollar,
  FaExchangeAlt, FaChartLine, FaFileAlt, FaCog, FaDatabase,
  FaMoneyBillWave, FaIndustry, FaTags, FaBalanceScale, FaFileInvoice
} from 'react-icons/fa';
import './AdminCompanySidebar.css';

const CompanySidebar = () => {
  const { companyId } = useParams();

  return (
    <div className="company-sidebar">
      <div className="sidebar-header">
        <h2>Company Name</h2>
        <p>ID: {companyId}</p>
      </div>
      
      <nav>
        {/* 📘 Master */}
        <div className="menu-section">
          <div className="section-title">Master</div>
          <ul>
            <li>
              <NavLink to={`/company/${companyId}/customers`}>
                <FaUsers />
                <span>Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/suppliers`}>
                <FaIndustry />
                <span>Suppliers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/account-groups`}>
                <FaDatabase />
                <span>Account Groups</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/ledgers`}>
                <FaBook />
                <span>Account Ledgers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/voucher-types`}>
                <FaFileInvoice />
                <span>Voucher Types</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/currencies`}>
                <FaMoneyBillWave />
                <span>Currencies</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/cost-centers`}>
                <FaBalanceScale />
                <span>Cost Centers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/departments`}>
                <FaUsers />
                <span>Departments</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 📦 Products & Services */}
        <div className="menu-section">
          <div className="section-title">Products & Services</div>
          <ul>
            <li>
              <NavLink to={`/company/${companyId}/product-categories`}>
                <FaTags />
                <span>Product Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/products`}>
                <FaBoxes />
                <span>Product Creation</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/brands`}>
                <FaTags />
                <span>Brands</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/units`}>
                <FaBalanceScale />
                <span>Units</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/tax-config`}>
                <FaFileInvoice />
                <span>Tax Configuration</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/purchase-price-list`}>
                <FaShoppingCart />
                <span>Purchase Price List</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/sales-price-list`}>
                <FaFileInvoiceDollar />
                <span>Sales Price List</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 📥 Purchases */}
        <div className="menu-section">
          <div className="section-title">Purchases</div>
          <ul>
            <li>
              <NavLink to={`/company/${companyId}/purchase-quotation`}>
                <FaFileAlt />
                <span>Purchase Quotation</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/purchase-orders`}>
                <FaShoppingCart />
                <span>Purchase Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/purchase-invoices`}>
                <FaFileInvoice />
                <span>Purchase Invoices</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/purchase-returns`}>
                <FaExchangeAlt />
                <span>Purchase Returns</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/vendor-payments`}>
                <FaMoneyBillWave />
                <span>Vendor Payments</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 📤 Sales */}
        <div className="menu-section">
          <div className="section-title">Sales</div>
          <ul>
            <li>
              <NavLink to={`/company/${companyId}/sales-quotation`}>
                <FaFileAlt />
                <span>Sales Quotation</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/sales-orders`}>
                <FaFileInvoiceDollar />
                <span>Sales Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/sales-invoices`}>
                <FaFileInvoice />
                <span>Sales Invoices</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/sales-returns`}>
                <FaExchangeAlt />
                <span>Sales Returns</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/customer-payments`}>
                <FaMoneyBillWave />
                <span>Customer Payments</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 🔁 Transactions */}
        <div className="menu-section">
          <div className="section-title">Transactions</div>
          <ul>
            <li>
              <NavLink to={`/company/${companyId}/bank-reconciliation`}>
                <FaExchangeAlt />
                <span>Bank Reconciliation</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/journal-vouchers`}>
                <FaBook />
                <span>Journal Vouchers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/payment-vouchers`}>
                <FaMoneyBillWave />
                <span>Payment Vouchers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/receipt-vouchers`}>
                <FaMoneyBillWave />
                <span>Receipt Vouchers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/contra-entry`}>
                <FaExchangeAlt />
                <span>Contra Entry</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 📈 Financial Statements */}
        <div className="menu-section">
          <div className="section-title">Financial Statements</div>
          <ul>
            <li>
              <NavLink to={`/company/${companyId}/balance-sheet`}>
                <FaBalanceScale />
                <span>Balance Sheet</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/profit-loss`}>
                <FaChartLine />
                <span>Profit & Loss</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/trial-balance`}>
                <FaBalanceScale />
                <span>Trial Balance</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/cash-flow`}>
                <FaChartLine />
                <span>Cash Flow</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/chart-of-accounts`}>
                <FaBook />
                <span>Chart of Accounts</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* ⚙️ Settings */}
        <div className="menu-section">
          <div className="section-title">Settings</div>
          <ul>
            <li>
              <NavLink to={`/company/${companyId}/financial-year-setup`}>
                <FaBook />
                <span>Financial Year Setup</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/email-config`}>
                <FaCog />
                <span>Email Configuration</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/user-creation`}>
                <FaUsers />
                <span>User Creation</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/company/${companyId}/backup-restore`}>
                <FaDatabase />
                <span>Backup & Restore</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default CompanySidebar;