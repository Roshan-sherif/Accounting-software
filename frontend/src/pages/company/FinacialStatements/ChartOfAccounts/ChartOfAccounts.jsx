import React, { useState } from 'react';
import './ChartOfAcounts.css';

const ChartOfAccounts = () => {
  const [filters, setFilters] = useState({
    accountType: 'All',
    activeOnly: true,
    searchTerm: ''
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    code: '',
    name: '',
    type: 'Asset',
    subType: 'Current Asset',
    description: '',
    isActive: true
  });

  const accountTypes = [
    { value: 'Asset', label: 'Assets', subTypes: ['Current Asset', 'Fixed Asset', 'Other Asset'] },
    { value: 'Liability', label: 'Liabilities', subTypes: ['Current Liability', 'Long-term Liability'] },
    { value: 'Equity', label: 'Equity', subTypes: ['Common Stock', 'Retained Earnings', 'Other Equity'] },
    { value: 'Revenue', label: 'Revenue', subTypes: ['Operating Revenue', 'Other Revenue'] },
    { value: 'Expense', label: 'Expenses', subTypes: ['Cost of Goods Sold', 'Operating Expense', 'Other Expense'] }
  ];

  // Sample chart of accounts data
  const [accounts, setAccounts] = useState([
    { id: 1, code: '1000', name: 'Cash', type: 'Asset', subType: 'Current Asset', description: 'Main operating cash account', isActive: true },
    { id: 2, code: '1100', name: 'Accounts Receivable', type: 'Asset', subType: 'Current Asset', description: 'Customer invoices outstanding', isActive: true },
    { id: 3, code: '1200', name: 'Inventory', type: 'Asset', subType: 'Current Asset', description: 'Goods held for sale', isActive: true },
    { id: 4, code: '1500', name: 'Office Equipment', type: 'Asset', subType: 'Fixed Asset', description: 'Computers, furniture, etc.', isActive: true },
    { id: 5, code: '2000', name: 'Accounts Payable', type: 'Liability', subType: 'Current Liability', description: 'Vendor invoices outstanding', isActive: true },
    { id: 6, code: '2500', name: 'Bank Loan', type: 'Liability', subType: 'Long-term Liability', description: '5-year business loan', isActive: true },
    { id: 7, code: '3000', name: 'Common Stock', type: 'Equity', subType: 'Common Stock', description: 'Par value of common stock', isActive: true },
    { id: 8, code: '3100', name: 'Retained Earnings', type: 'Equity', subType: 'Retained Earnings', description: 'Accumulated profits', isActive: true },
    { id: 9, code: '4000', name: 'Product Sales', type: 'Revenue', subType: 'Operating Revenue', description: 'Revenue from product sales', isActive: true },
    { id: 10, code: '5000', name: 'Cost of Goods Sold', type: 'Expense', subType: 'Cost of Goods Sold', description: 'Direct costs of products sold', isActive: true },
    { id: 11, code: '6000', name: 'Salaries Expense', type: 'Expense', subType: 'Operating Expense', description: 'Employee salaries and wages', isActive: true },
    { id: 12, code: '6100', name: 'Rent Expense', type: 'Expense', subType: 'Operating Expense', description: 'Office and warehouse rent', isActive: true },
    { id: 13, code: '6200', name: 'Utilities Expense', type: 'Expense', subType: 'Operating Expense', description: 'Electricity, water, internet', isActive: true },
    { id: 14, code: '7000', name: 'Depreciation Expense', type: 'Expense', subType: 'Operating Expense', description: 'Asset depreciation', isActive: true },
    { id: 15, code: '8000', name: 'Interest Expense', type: 'Expense', subType: 'Other Expense', description: 'Interest on loans', isActive: true },
  ]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNewAccountChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAccount(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
    setAccounts([...accounts, { ...newAccount, id: newId }]);
    setIsAddModalOpen(false);
    setNewAccount({
      code: '',
      name: '',
      type: 'Asset',
      subType: 'Current Asset',
      description: '',
      isActive: true
    });
  };

  const toggleAccountStatus = (id) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, isActive: !account.isActive } : account
    ));
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesType = filters.accountType === 'All' || account.type === filters.accountType;
    const matchesActive = !filters.activeOnly || account.isActive;
    const matchesSearch = account.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                         account.code.includes(filters.searchTerm);
    return matchesType && matchesActive && matchesSearch;
  });

  const getAccountTypeLabel = (type) => {
    const found = accountTypes.find(t => t.value === type);
    return found ? found.label : type;
  };

  return (
    <div className="chart-of-accounts-container">
      <div className="header-section">
        <h2>Chart of Accounts</h2>
        
        <div className="controls">
          <div className="filters">
            <div className="filter-group">
              <label>Account Type:</label>
              <select
                name="accountType"
                value={filters.accountType}
                onChange={handleFilterChange}
              >
                <option value="All">All Types</option>
                {accountTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  name="activeOnly"
                  checked={filters.activeOnly}
                  onChange={handleFilterChange}
                />
                Active Only
              </label>
            </div>
            
            <div className="filter-group search">
              <input
                type="text"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
                placeholder="Search accounts..."
              />
            </div>
          </div>
          
          <button 
            className="add-account-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add New Account
          </button>
        </div>
      </div>

      <div className="accounts-table-container">
        <table className="accounts-table">
          <thead>
            <tr>
              <th width="10%">Code</th>
              <th width="25%">Account Name</th>
              <th width="15%">Type</th>
              <th width="15%">Sub-Type</th>
              <th width="25%">Description</th>
              <th width="10%">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map(account => (
                <tr key={account.id}>
                  <td>{account.code}</td>
                  <td>{account.name}</td>
                  <td>{getAccountTypeLabel(account.type)}</td>
                  <td>{account.subType}</td>
                  <td>{account.description}</td>
                  <td>
                    <span className={`status-badge ${account.isActive ? 'active' : 'inactive'}`}>
                      {account.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button 
                      className="toggle-status-btn"
                      onClick={() => toggleAccountStatus(account.id)}
                    >
                      {account.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">No accounts found matching your criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Account Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Account</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleAddAccount}>
              <div className="form-group">
                <label>Account Code:</label>
                <input
                  type="text"
                  name="code"
                  value={newAccount.code}
                  onChange={handleNewAccountChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Account Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newAccount.name}
                  onChange={handleNewAccountChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Account Type:</label>
                <select
                  name="type"
                  value={newAccount.type}
                  onChange={handleNewAccountChange}
                  required
                >
                  {accountTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Sub-Type:</label>
                <select
                  name="subType"
                  value={newAccount.subType}
                  onChange={handleNewAccountChange}
                  required
                >
                  {accountTypes.find(t => t.value === newAccount.type)?.subTypes.map(subType => (
                    <option key={subType} value={subType}>{subType}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={newAccount.description}
                  onChange={handleNewAccountChange}
                  rows="3"
                />
              </div>
              
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={newAccount.isActive}
                    onChange={handleNewAccountChange}
                  />
                  Active Account
                </label>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartOfAccounts;