import React, { useState } from 'react';
import './JournalVoucher.css';

const JournalVoucher = () => {
  const [voucherNo, setVoucherNo] = useState(`JV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [voucherDate, setVoucherDate] = useState(new Date().toISOString().split('T')[0]);
  const [narration, setNarration] = useState('');
  
  const [entries, setEntries] = useState([
    {
      id: 1,
      accountLedger: '',
      drCr: 'Dr',
      amount: 0,
      currency: 'USD',
      chequeNo: '',
      chequeDate: '',
    }
  ]);

  const accountLedgers = [
    { id: 1, name: 'Cash Account' },
    { id: 2, name: 'Bank Account' },
    { id: 3, name: 'Accounts Receivable' },
    { id: 4, name: 'Accounts Payable' },
    { id: 5, name: 'Sales Revenue' },
    { id: 6, name: 'Purchase Account' },
    { id: 7, name: 'Expense Account' }
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AED'];

  const handleEntryChange = (id, field, value) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const addNewEntry = () => {
    setEntries([
      ...entries,
      {
        id: entries.length + 1,
        accountLedger: '',
        drCr: 'Dr',
        amount: 0,
        currency: 'USD',
        chequeNo: '',
        chequeDate: '',
      }
    ]);
  };

  const removeEntry = (id) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const calculateTotals = () => {
    const debitTotal = entries
      .filter(entry => entry.drCr === 'Dr')
      .reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0);
    
    const creditTotal = entries
      .filter(entry => entry.drCr === 'Cr')
      .reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0);
    
    return { debitTotal, creditTotal, difference: debitTotal - creditTotal };
  };

  const { debitTotal, creditTotal, difference } = calculateTotals();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log({
      voucherNo,
      voucherDate,
      narration,
      entries,
      totals: { debitTotal, creditTotal }
    });
  };

  return (
    <div className="journal-voucher-container">
      <h2>Journal Voucher</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="voucher-header">
          <div className="form-group">
            <label>Voucher No:</label>
            <input
              type="text"
              value={voucherNo}
              onChange={(e) => setVoucherNo(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={voucherDate}
              onChange={(e) => setVoucherDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group narration">
          <label>Narration:</label>
          <textarea
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            rows="2"
          />
        </div>

        <div className="entries-table">
          <table>
            <thead>
              <tr>
                <th width="5%">S.No</th>
                <th width="25%">Account Ledger</th>
                <th width="10%">Dr/Cr</th>
                <th width="15%">Amount</th>
                <th width="10%">Currency</th>
                <th width="15%">Cheque No</th>
                <th width="15%">Cheque Date</th>
                <th width="5%">Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id}>
                  <td>{index + 1}</td>
                  <td>
                    <select
                      value={entry.accountLedger}
                      onChange={(e) => handleEntryChange(entry.id, 'accountLedger', e.target.value)}
                      required
                    >
                      <option value="">Select Account</option>
                      {accountLedgers.map(ledger => (
                        <option key={ledger.id} value={ledger.id}>
                          {ledger.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={entry.drCr}
                      onChange={(e) => handleEntryChange(entry.id, 'drCr', e.target.value)}
                    >
                      <option value="Dr">Dr</option>
                      <option value="Cr">Cr</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={entry.amount}
                      onChange={(e) => handleEntryChange(entry.id, 'amount', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <select
                      value={entry.currency}
                      onChange={(e) => handleEntryChange(entry.id, 'currency', e.target.value)}
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={entry.chequeNo}
                      onChange={(e) => handleEntryChange(entry.id, 'chequeNo', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={entry.chequeDate}
                      onChange={(e) => handleEntryChange(entry.id, 'chequeDate', e.target.value)}
                    />
                  </td>
                  <td>
                    {entries.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeEntry(entry.id)}
                      >
                        ×
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button
            type="button"
            className="add-entry-btn"
            onClick={addNewEntry}
          >
            + Add New Entry
          </button>
        </div>

        <div className="totals-section">
          <div className="totals-grid">
            <div className="total-label">Total Debit:</div>
            <div className="total-value">{debitTotal.toFixed(2)}</div>
            
            <div className="total-label">Total Credit:</div>
            <div className="total-value">{creditTotal.toFixed(2)}</div>
            
            <div className={`difference-label ${difference !== 0 ? 'unbalanced' : ''}`}>
              Difference:
            </div>
            <div className={`difference-value ${difference !== 0 ? 'unbalanced' : ''}`}>
              {Math.abs(difference).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={difference !== 0}>
            Save Voucher
          </button>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalVoucher;