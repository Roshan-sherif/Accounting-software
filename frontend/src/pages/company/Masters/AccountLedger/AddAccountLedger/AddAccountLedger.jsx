import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../AccountLedger.css';

const LedgerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accountGroups, setAccountGroups] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    ledgerCode: '',
    ledgerName: '',
    group: '',
    accountNumber: '',
    bankName: '',
    branchCode: '',
    branchName: '',
    ifscCode: '',
    openingBalance: 0,
    balanceType: 'Debit',
    description: '',
    isActive: true
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      
      // Simulate API calls
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 300)), // Groups
        new Promise(resolve => setTimeout(resolve, 300))  // Branches
      ]);
      
      setAccountGroups([
        'Current Assets', 'Fixed Assets', 'Current Liabilities',
        'Long Term Liabilities', 'Income', 'Expenses'
      ]);
      
      setBranches([
        { code: 'BRNCH001', name: 'Main Branch' },
        { code: 'BRNCH002', name: 'West Branch' }
      ]);
      
      if (id) {
        // Simulate fetching existing ledger
        await new Promise(resolve => setTimeout(resolve, 500));
        setFormData({
          ledgerCode: 'CASH-001',
          ledgerName: 'Main Cash Account',
          group: 'Current Assets',
          accountNumber: '1234567890',
          bankName: 'National Bank',
          branchCode: 'BRNCH001',
          branchName: 'Main Branch',
          ifscCode: 'NBIN1234567',
          openingBalance: 50000,
          balanceType: 'Debit',
          description: 'Primary cash account for daily transactions',
          isActive: true
        });
      }
      
      setIsLoading(false);
    };

    fetchInitialData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleBranchChange = (e) => {
    const branchCode = e.target.value;
    const selectedBranch = branches.find(b => b.code === branchCode);
    
    setFormData(prev => ({
      ...prev,
      branchCode,
      branchName: selectedBranch ? selectedBranch.name : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/ledgers');
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading ledger data...</div>;
  }

  return (
    <div className="accounting-form-page">
      <h2>{id ? 'Edit' : 'Create'} Ledger Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Ledger Code*</label>
              <input
                type="text"
                name="ledgerCode"
                value={formData.ledgerCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Ledger Name*</label>
              <input
                type="text"
                name="ledgerName"
                value={formData.ledgerName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Account Group*</label>
              <select
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select Group --</option>
                {accountGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Balance Type*</label>
              <select
                name="balanceType"
                value={formData.balanceType}
                onChange={handleInputChange}
                required
              >
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
          </div>

          <h3>Bank & Branch Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Branch*</label>
              <select
                name="branchCode"
                value={formData.branchCode}
                onChange={handleBranchChange}
                required
              >
                <option value="">-- Select Branch --</option>
                {branches.map(branch => (
                  <option key={branch.code} value={branch.code}>
                    {branch.code} - {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h3>Financial Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Opening Balance</label>
              <div className="amount-input-container">
                <input
                  type="number"
                  name="openingBalance"
                  value={formData.openingBalance}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Status</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                <label htmlFor="isActive">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="accounting-btn accounting-btn-secondary"
            onClick={() => navigate('/ledgers')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="accounting-btn accounting-btn-primary"
          >
            {id ? 'Update' : 'Create'} Ledger
          </button>
        </div>
      </form>
    </div>
  );
};

export default LedgerForm;