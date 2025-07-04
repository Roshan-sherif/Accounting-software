// src/pages/company/Purchases/PurchaseOrder/AddPurchaseOrder/AddPurchaseOrder.jsx
import React, { useState, useEffect } from 'react';

const AddPurchaseOrder = () => {
  const [supplier, setSupplier] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [quotationNo, setQuotationNo] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState([{
    id: 1, barcode: '', product: '', unit: '', qty: 1, unitPrice: 0, total: 0
  }]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [freight, setFreight] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [approved, setApproved] = useState(false);

  const addItem = () => {
    setItems([...items, {
      id: items.length + 1, barcode: '', product: '', unit: '', qty: 1, unitPrice: 0, total: 0
    }]);
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { 
          ...item, 
          [field]: field === 'qty' || field === 'unitPrice' ? Number(value) : value
        };
        if (field === 'qty' || field === 'unitPrice') {
          updatedItem.total = updatedItem.qty * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const calculateTotals = (currentItems) => {
    const newSubtotal = currentItems.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal - discount + freight + tax);
  };

  useEffect(() => {
    calculateTotals(items);
  }, [discount, freight, tax, items]);

  return (
    <div className="purchase-document-container">
      <h2 className="document-title">Create Purchase Order</h2>
      
      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>Supplier</label>
            <input 
              type="text" 
              value={supplier} 
              onChange={(e) => setSupplier(e.target.value)} 
              placeholder="Enter supplier name"
            />
          </div>
          
          <div className="form-group">
            <label>Order No</label>
            <input 
              type="text" 
              value={orderNo} 
              onChange={(e) => setOrderNo(e.target.value)}
              placeholder="ORD-001"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quotation No</label>
            <input 
              type="text" 
              value={quotationNo} 
              onChange={(e) => setQuotationNo(e.target.value)}
              placeholder="QUO-001"
            />
          </div>
          
          <div className="form-group">
            <label>Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
        </div>
      </div>

      <div className="product-table-section">
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Barcode</th>
              <th>Product</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <input 
                    type="text" 
                    value={item.barcode} 
                    onChange={(e) => handleItemChange(item.id, 'barcode', e.target.value)}
                    placeholder="Scan barcode"
                  />
                </td>
                <td>
                  <select
                    value={item.product}
                    onChange={(e) => handleItemChange(item.id, 'product', e.target.value)}
                  >
                    <option value="">Select Product</option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                    <option value="product3">Product 3</option>
                  </select>
                </td>
                <td>
                  <select
                    value={item.unit}
                    onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                  >
                    <option value="">Select Unit</option>
                    <option value="piece">Piece</option>
                    <option value="kg">Kilogram</option>
                    <option value="box">Box</option>
                  </select>
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
                <td>{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-item-button" onClick={addItem}>
          + Add Product Line
        </button>
      </div>

      <div className="totals-section">
        <div className="totals-card">
          <div className="totals-row">
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="totals-row">
            <span>Discount:</span>
            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
          <div className="totals-row">
            <span>Freight:</span>
            <input
              type="number"
              min="0"
              value={freight}
              onChange={(e) => setFreight(Number(e.target.value))}
            />
          </div>
          <div className="totals-row">
            <span>Tax:</span>
            <input
              type="number"
              min="0"
              value={tax}
              onChange={(e) => setTax(Number(e.target.value))}
            />
          </div>
          <div className="totals-row grand-total">
            <span>Total:</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="remarks-section">
        <label>Remarks</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Additional notes..."
          rows="3"
        />
      </div>

      <div className="action-buttons">
        <label className="approval-checkbox">
          <input
            type="checkbox"
            checked={approved}
            onChange={() => setApproved(!approved)}
          />
          Approved
        </label>
        <button className="save-button">Save Order</button>
        <button className="print-button">Print Preview</button>
      </div>
    </div>
  );
};

export default AddPurchaseOrder;