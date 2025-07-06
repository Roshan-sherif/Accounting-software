import React, { useState } from 'react';
import './ReciptVoucher.css';

const ReceiptVoucher = () => {
  const [voucherData, setVoucherData] = useState({
    voucherNo: `RV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    receivedFrom: '',
    paymentMode: 'Cash',
    bankAccount: '',
    chequeNo: '',
    chequeDate: '',
    referenceNo: '',
    narration: '',
    items: [
      { id: 1, accountLedger: '', amount: 0, tax: 0, total: 0 }
    ],
    subtotal: 0,
    taxTotal: 0,
    grandTotal: 0
  });

  const accountLedgers = [
    { id: 1, name: 'Sales Revenue' },
    { id: 2, name: 'Service Income' },
    { id: 3, name: 'Interest Income' },
    { id: 4, name: 'Loan Receipt' },
    { id: 5, name: 'Advance Received' },
    { id: 6, name: 'Other Income' }
  ];

  const bankAccounts = [
    { id: 1, name: 'HDFC Bank - XXXX1234' },
    { id: 2, name: 'ICICI Bank - XXXX5678' },
    { id: 3, name: 'SBI - XXXX9012' }
  ];

  const paymentModes = ['Cash', 'Cheque', 'Bank Transfer', 'Credit Card', 'Online Payment'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoucherData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = voucherData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { 
          ...item, 
          [field]: Number(value) || 0
        };
        
        if (field === 'amount' || field === 'tax') {
          updatedItem.total = updatedItem.amount + updatedItem.tax;
        }
        
        return updatedItem;
      }
      return item;
    });

    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const taxTotal = updatedItems.reduce((sum, item) => sum + item.tax, 0);
    const grandTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);

    setVoucherData({
      ...voucherData,
      items: updatedItems,
      subtotal,
      taxTotal,
      grandTotal
    });
  };

  const addNewItem = () => {
    setVoucherData({
      ...voucherData,
      items: [
        ...voucherData.items,
        { id: voucherData.items.length + 1, accountLedger: '', amount: 0, tax: 0, total: 0 }
      ]
    });
  };

  const removeItem = (id) => {
    if (voucherData.items.length > 1) {
      setVoucherData({
        ...voucherData,
        items: voucherData.items.filter(item => item.id !== id)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Receipt Voucher Submitted:', voucherData);
    // Add your submission logic here
  };

  return (
    <div className="receipt-voucher-container">
      <h2>Receipt Voucher</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="voucher-header">
          <div className="form-group">
            <label>Voucher No:</label>
            <input
              type="text"
              name="voucherNo"
              value={voucherData.voucherNo}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={voucherData.date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="receipt-details">
          <div className="form-group">
            <label>Received From:</label>
            <input
              type="text"
              name="receivedFrom"
              value={voucherData.receivedFrom}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Payment Mode:</label>
            <select
              name="paymentMode"
              value={voucherData.paymentMode}
              onChange={handleInputChange}
              required
            >
              {paymentModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          {voucherData.paymentMode !== 'Cash' && (
            <>
              <div className="form-group">
                <label>Bank Account:</label>
                <select
                  name="bankAccount"
                  value={voucherData.bankAccount}
                  onChange={handleInputChange}
                  required={voucherData.paymentMode !== 'Cash'}
                >
                  <option value="">Select Bank</option>
                  {bankAccounts.map(account => (
                    <option key={account.id} value={account.id}>{account.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Reference/Cheque No:</label>
                <input
                  type="text"
                  name="chequeNo"
                  value={voucherData.chequeNo}
                  onChange={handleInputChange}
                  required={voucherData.paymentMode !== 'Cash'}
                />
              </div>

              <div className="form-group">
                <label>Reference/Cheque Date:</label>
                <input
                  type="date"
                  name="chequeDate"
                  value={voucherData.chequeDate}
                  onChange={handleInputChange}
                  required={['Cheque', 'Bank Transfer'].includes(voucherData.paymentMode)}
                />
              </div>
            </>
          )}
        </div>

        <div className="form-group narration">
          <label>Narration:</label>
          <textarea
            name="narration"
            value={voucherData.narration}
            onChange={handleInputChange}
            rows="2"
          />
        </div>

        <div className="items-table">
          <table>
            <thead>
              <tr>
                <th width="5%">S.No</th>
                <th width="35%">Account Ledger</th>
                <th width="15%">Amount</th>
                <th width="15%">Tax</th>
                <th width="15%">Total</th>
                <th width="15%">Action</th>
              </tr>
            </thead>
            <tbody>
              {voucherData.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <select
                      value={item.accountLedger}
                      onChange={(e) => handleItemChange(item.id, 'accountLedger', e.target.value)}
                      required
                    >
                      <option value="">Select Account</option>
                      {accountLedgers.map(ledger => (
                        <option key={ledger.id} value={ledger.id}>{ledger.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.amount}
                      onChange={(e) => handleItemChange(item.id, 'amount', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.tax}
                      onChange={(e) => handleItemChange(item.id, 'tax', e.target.value)}
                    />
                  </td>
                  <td>{item.total.toFixed(2)}</td>
                  <td>
                    {voucherData.items.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
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
            className="add-item-btn"
            onClick={addNewItem}
          >
            + Add Item
          </button>
        </div>

        <div className="totals-section">
          <div className="totals-grid">
            <div className="total-label">Subtotal:</div>
            <div className="total-value">{voucherData.subtotal.toFixed(2)}</div>
            
            <div className="total-label">Total Tax:</div>
            <div className="total-value">{voucherData.taxTotal.toFixed(2)}</div>
            
            <div className="total-label grand-total">Grand Total:</div>
            <div className="total-value grand-total">{voucherData.grandTotal.toFixed(2)}</div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Voucher
          </button>
          <button type="button" className="print-btn">
            Print Voucher
          </button>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceiptVoucher;