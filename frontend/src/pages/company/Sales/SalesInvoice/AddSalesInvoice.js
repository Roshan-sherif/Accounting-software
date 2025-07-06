import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesInvoiceCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplier: '',
    currency: 'USD',
    invoiceNo: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    orderNo: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
    items: [
      { id: 1, barcode: '', product: '', unit: '', qty: 1, unitPrice: 0, total: 0 }
    ],
    subtotal: 0,
    discount: 0,
    freight: 0,
    tax: 0,
    total: 0,
    remarks: '',
    approved: false,
    printAfterSave: false
  });

  const handleItemChange = (id, field, value) => {
    const updatedItems = formData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { 
          ...item, 
          [field]: ['qty', 'unitPrice', 'total'].includes(field) ? Number(value) : value
        };
        if (field === 'qty' || field === 'unitPrice') {
          updatedItem.total = updatedItem.qty * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    });

    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal - formData.discount + formData.freight + formData.tax;

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
        { id: formData.items.length + 1, barcode: '', product: '', unit: '', qty: 1, unitPrice: 0, total: 0 }
      ]
    });
  };

  const handleSave = () => {
    console.log('Invoice saved:', formData);
    navigate('/sales/invoices');
  };

  return (
    <div className="invoice-container">
      {/* Header Section */}
      <div className="header-section">
        <div className="supplier-field">
          <label>Supplier:</label>
          <input
            type="text"
            value={formData.supplier}
            onChange={(e) => setFormData({...formData, supplier: e.target.value})}
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
            <label>Invoice No:</label>
            <input
              type="text"
              value={formData.invoiceNo}
              onChange={(e) => setFormData({...formData, invoiceNo: e.target.value})}
            />
          </div>
          
          <div className="info-field">
            <label>Order No:</label>
            <input
              type="text"
              value={formData.orderNo}
              onChange={(e) => setFormData({...formData, orderNo: e.target.value})}
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
              <th width="10%">Qty</th>
              <th width="15%">Unit Price</th>
              <th width="15%">Total</th>
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
                    min="1"
                    value={item.qty}
                    onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
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
        <div className="remarks-section">
          <label>Remarks:</label>
          <textarea
            value={formData.remarks}
            onChange={(e) => setFormData({...formData, remarks: e.target.value})}
            rows="3"
          />
        </div>
        
        <div className="totals-section">
          <div className="totals-grid">
            <div className="totals-label">Subtotal:</div>
            <div className="totals-value">{formData.subtotal.toFixed(2)}</div>
            
            <div className="totals-label">Discount:</div>
            <div className="totals-input">
              <input
                type="number"
                min="0"
                value={formData.discount}
                onChange={(e) => {
                  const discount = Number(e.target.value);
                  setFormData({
                    ...formData,
                    discount,
                    total: formData.subtotal - discount + formData.freight + formData.tax
                  });
                }}
              />
            </div>
            
            <div className="totals-label">Freight:</div>
            <div className="totals-input">
              <input
                type="number"
                min="0"
                value={formData.freight}
                onChange={(e) => {
                  const freight = Number(e.target.value);
                  setFormData({
                    ...formData,
                    freight,
                    total: formData.subtotal - formData.discount + freight + formData.tax
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
                    total: formData.subtotal - formData.discount + formData.freight + tax
                  });
                }}
              />
            </div>
            
            <div className="totals-label grand-total">Total:</div>
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
          <button className="close-btn" onClick={() => navigate('/sales/invoices')}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceCreate;