
import React, { useState } from 'react';
import './BankReconciliation.css';

const BankReconciliation = () => {
  const [formData, setFormData] = useState({
    bankAccount: '',
    statementDateFrom: '',
    statementDateTo: '',
    status: 'Pending'
  });

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2023-06-01',
      particular: 'Office Supplies',
      voucherType: 'Payment',
      voucherNo: 'PV-001',
      chequeNo: 'CHQ-123',
      deposit: 0,
      withdraw: 5000,
      statementDate: '2023-06-03',
      reconciled: false
    },
    {
      id: 2,
      date: '2023-06-02',
      particular: 'Client Payment',
      voucherType: 'Receipt',
      voucherNo: 'RV-001',
      chequeNo: '',
      deposit: 15000,
      withdraw: 0,
      statementDate: '2023-06-04',
      reconciled: true
    },
    // Add more sample transactions as needed
  ]);

  const [balances, setBalances] = useState({
    companyBook: 125000,
    bankStatement: 120000,
    difference: 5000
  });

  const bankAccounts = [
    { id: 1, name: 'HDFC Bank - XXXX1234' },
    { id: 2, name: 'ICICI Bank - XXXX5678' },
    { id: 3, name: 'SBI - XXXX9012' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleReconciliation = (id) => {
    setTransactions(transactions.map(txn => 
      txn.id === id ? { ...txn, reconciled: !txn.reconciled } : txn
    ));
  };

  return (
    <div className="bank-reconciliation-container">
      <div className="header-section">
        <h2>Bank Reconciliation</h2>
        
        <div className="filter-section">
          <div className="form-group">
            <label>Bank Account:</label>
            <select
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleInputChange}
            >
              <option value="">Select Bank Account</option>
              {bankAccounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Statement Date From:</label>
            <input
              type="date"
              name="statementDateFrom"
              value={formData.statementDateFrom}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Statement Date To:</label>
            <input
              type="date"
              name="statementDateTo"
              value={formData.statementDateTo}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="All">All</option>
            </select>
          </div>

          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="transaction-table-section">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Particular</th>
              <th>Voucher Type</th>
              <th>Voucher No</th>
              <th>Cheque No</th>
              <th>Deposit</th>
              <th>Withdraw</th>
              <th>Statement Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={txn.id} className={txn.reconciled ? 'reconciled' : ''}>
                <td>{index + 1}</td>
                <td>{txn.date}</td>
                <td>{txn.particular}</td>
                <td>{txn.voucherType}</td>
                <td>{txn.voucherNo}</td>
                <td>{txn.chequeNo}</td>
                <td>{txn.deposit > 0 ? txn.deposit.toFixed(2) : '-'}</td>
                <td>{txn.withdraw > 0 ? txn.withdraw.toFixed(2) : '-'}</td>
                <td>{txn.statementDate}</td>
                <td>
                  <button 
                    onClick={() => toggleReconciliation(txn.id)}
                    className={`reconcile-btn ${txn.reconciled ? 'reconciled' : ''}`}
                  >
                    {txn.reconciled ? 'Reconciled' : 'Reconcile'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="balance-summary-section">
        <table className="balance-table">
          <thead>
            <tr>
              <th></th>
              <th>Debit</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Balance as per Company Book</td>
              <td>{balances.companyBook.toFixed(2)}</td>
              <td></td>
            </tr>
            <tr>
              <td>Balance as per Bank</td>
              <td></td>
              <td>{balances.bankStatement.toFixed(2)}</td>
            </tr>
            <tr className="difference-row">
              <td>Difference</td>
              <td>{balances.difference > 0 ? balances.difference.toFixed(2) : ''}</td>
              <td>{balances.difference < 0 ? Math.abs(balances.difference).toFixed(2) : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button className="save-btn">Save Reconciliation</button>
        <button className="print-btn">Print Report</button>
        <button className="clear-btn">Clear</button>
      </div>
    </div>
  );
};

export default BankReconciliation;