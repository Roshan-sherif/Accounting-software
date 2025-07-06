import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SalesOrders.css';

const SalesOrderCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: '',
    currency: 'USD',
    orderNo: `SO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    quotationNo: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
    items: [
      { id: 1, barcode: '', product: '', unit: '', qty: 1, unitPrice: 0, total: 0 }
    ],
    subtotal: 0,
    discount: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    shippingAddress: '',
    billingAddress: '',
    terms: '',
    notes: '',
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
    const total = subtotal - formData.discount + formData.tax + formData.shipping;

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
    console.log('Sales Order saved:', formData);
    navigate('/sales/orders');
  };

  return (
    <div className="sales-order-container">
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
            <label>Order No:</label>
            <input
              type="text"
              value={formData.orderNo}
              onChange={(e) => setFormData({...formData, orderNo: e.target.value})}
            />
          </div>
          
          <div className="info-field">
            <label>Quotation No:</label>
            <input
              type="text"
              value={formData.quotationNo}
              onChange={(e) => setFormData({...formData, quotationNo: e.target.value})}
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
            <label>Delivery Date:</label>
            <input
              type="text"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="address-section">
        <div className="shipping-address">
          <label>Shipping Address:</label>
          <textarea
            value={formData.shippingAddress}
            onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
            rows="3"
          />
        </div>
        <div className="billing-address">
          <label>Billing Address:</label>
          <textarea
            value={formData.billingAddress}
            onChange={(e) => setFormData({...formData, billingAddress: e.target.value})}
            rows="3"
          />
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
        <div className="terms-notes-section">
          <div className="terms-field">
            <label>Terms & Conditions:</label>
            <textarea
              value={formData.terms}
              onChange={(e) => setFormData({...formData, terms: e.target.value})}
              rows="3"
            />
          </div>
          <div className="notes-field">
            <label>Notes:</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows="3"
            />
          </div>
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
                    total: formData.subtotal - discount + formData.tax + formData.shipping
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
                    total: formData.subtotal - formData.discount + tax + formData.shipping
                  });
                }}
              />
            </div>

            <div className="totals-label">Shipping:</div>
            <div className="totals-input">
              <input
                type="number"
                min="0"
                value={formData.shipping}
                onChange={(e) => {
                  const shipping = Number(e.target.value);
                  setFormData({
                    ...formData,
                    shipping,
                    total: formData.subtotal - formData.discount + formData.tax + shipping
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
          <button className="close-btn" onClick={() => navigate('/sales/orders')}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderCreate;