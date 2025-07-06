import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SalesReturn.css';

const SalesReturnCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: '',
    currency: 'USD',
    returnNo: `RTN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    invoiceNo: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
    reason: 'Damaged',
    items: [
      { id: 1, barcode: '', product: '', unit: '', originalQty: 0, returnQty: 1, unitPrice: 0, total: 0 }
    ],
    subtotal: 0,
    restockingFee: 0,
    tax: 0,
    total: 0,
    returnMethod: 'Refund',
    notes: '',
    approved: false,
    printAfterSave: false
  });

  const handleItemChange = (id, field, value) => {
    const updatedItems = formData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { 
          ...item, 
          [field]: ['originalQty', 'returnQty', 'unitPrice', 'total'].includes(field) ? Number(value) : value
        };
        if (field === 'returnQty' || field === 'unitPrice') {
          updatedItem.total = updatedItem.returnQty * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    });

    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal - formData.restockingFee + formData.tax;

    setFormData({
      ...formData,
      items: updatedItems,
      subtotal,
      total
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { id: formData.items.length + 1, barcode: '', product: '', unit: '', originalQty: 0, returnQty: 1, unitPrice: 0, total: 0 }
      ]
    });
  };

  const handleSave = () => {
    console.log('Return saved:', formData);
    navigate('/sales/returns');
  };

  return (
    <div className="sales-return-container">
      {/* Header Section */}
      <div className="header-section">
        <div className="customer-field">
          <label>Customer:</label>
          <input
            type="text"
            value={formData.customer}
            onChange={(e) => setFormData({...formData, customer: e.target.value})}
          />
        </div>
        
        <div className="document-info">
          <div className="info-field">
            <label>Currency:</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          
          <div className="info-field">
            <label>Return No:</label>
            <input
              type="text"
              value={formData.returnNo}
              onChange={(e) => setFormData({...formData, returnNo: e.target.value})}
            />
          </div>
          
          <div className="info-field">
            <label>Invoice No:</label>
            <input
              type="text"
              value={formData.invoiceNo}
              onChange={(e) => setFormData({...formData, invoiceNo: e.target.value})}
            />
          </div>
          
          <div className="info-field">
            <label>Date:</label>
            <input
              type="text"
              value={formData.date}
              readOnly
            />
          </div>

          <div className="info-field">
            <label>Reason:</label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            >
              <option value="Damaged">Damaged</option>
              <option value="Wrong Item">Wrong Item</option>
              <option value="Defective">Defective</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="info-field">
            <label>Return Method:</label>
            <select
              value={formData.returnMethod}
              onChange={(e) => setFormData({...formData, returnMethod: e.target.value})}
            >
              <option value="Refund">Refund</option>
              <option value="Exchange">Exchange</option>
              <option value="Credit">Store Credit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="product-section">
        <table className="product-table">
          <thead>
            <tr>
              <th width="5%">#</th>
              <th width="15%">Barcode</th>
              <th width="25%">Product</th>
              <th width="10%">Unit</th>
              <th width="10%">Original Qty</th>
              <th width="10%">Return Qty</th>
              <th width="15%">Unit Price</th>
              <th width="10%">Total</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <input
                    type="text"
                    value={item.barcode}
                    onChange={(e) => handleItemChange(item.id, 'barcode', e.target.value)}
                  />
                </td>
                <td>
                  <div className="select-wrapper">
                    <select
                      value={item.product}
                      onChange={(e) => handleItemChange(item.id, 'product', e.target.value)}
                    >
                      <option value="">--select--</option>
                      <option value="product1">Product 1</option>
                      <option value="product2">Product 2</option>
                    </select>
                    <span className="dropdown-icon">▼</span>
                  </div>
                </td>
                <td>
                  <div className="select-wrapper">
                    <select
                      value={item.unit}
                      onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                    >
                      <option value="">--select--</option>
                      <option value="piece">Piece</option>
                      <option value="kg">Kilogram</option>
                    </select>
                    <span className="dropdown-icon">▼</span>
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={item.originalQty}
                    onChange={(e) => handleItemChange(item.id, 'originalQty', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max={item.originalQty}
                    value={item.returnQty}
                    onChange={(e) => handleItemChange(item.id, 'returnQty', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                  />
                </td>
                <td>{item.total.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-item-btn" onClick={addItem}>
          + Add Product
        </button>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <div className="notes-section">
          <label>Notes:</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows="3"
          />
        </div>
        
        <div className="totals-section">
          <div className="totals-grid">
            <div className="totals-label">Subtotal:</div>
            <div className="totals-value">{formData.subtotal.toFixed(2)}</div>
            
            <div className="totals-label">Restocking Fee:</div>
            <div className="totals-input">
              <input
                type="number"
                min="0"
                value={formData.restockingFee}
                onChange={(e) => {
                  const restockingFee = Number(e.target.value);
                  setFormData({
                    ...formData,
                    restockingFee,
                    total: formData.subtotal - restockingFee + formData.tax
                  });
                }}
              />
            </div>
            
            <div className="totals-label">Tax:</div>
            <div className="totals-input">
              <input
                type="number"
                min="0"
                value={formData.tax}
                onChange={(e) => {
                  const tax = Number(e.target.value);
                  setFormData({
                    ...formData,
                    tax,
                    total: formData.subtotal - formData.restockingFee + tax
                  });
                }}
              />
            </div>
            
            <div className="totals-label grand-total">Total Refund:</div>
            <div className="totals-value grand-total">{formData.total.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-section">
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={formData.approved}
              onChange={(e) => setFormData({...formData, approved: e.target.checked})}
            />
            Approved
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.printAfterSave}
              onChange={(e) => setFormData({...formData, printAfterSave: e.target.checked})}
            />
            Print After Save
          </label>
        </div>
        <div className="buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="close-btn" onClick={() => navigate('/sales/returns')}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SalesReturnCreate;