import React, { useState } from 'react';
import '../Product.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    productGroup: '',
    barcode: '',
    brand: '',
    minimumStock: 0,
    size: '',
    narration: '',
    tax: '',
    openingStock: 0,
    status: 'Active',
    uom: '',
    purchaseRate: 0,
    saleRate: 0,
  });

  const [uoms, setUoms] = useState(['Piece', 'Kg', 'Liter', 'Box']);
  const [showUomModal, setShowUomModal] = useState(false);
  const [newUom, setNewUom] = useState('');

  const handleUomAdd = () => {
    if (newUom.trim() !== '') {
      setUoms([...uoms, newUom]);
      setFormData({ ...formData, uom: newUom });
      setNewUom('');
      setShowUomModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Submitted:', formData);
    // Submit to API here
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name*</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label>Product Group</label>
          <input
            type="text"
            value={formData.productGroup}
            onChange={(e) => setFormData({ ...formData, productGroup: e.target.value })}
          />
        </div>

        <div className="form-row">
          <label>Barcode</label>
          <input
            type="text"
            value={formData.barcode}
            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
          />
          <label>Brand</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />
        </div>

        <div className="form-row">
          <label>Minimum Stock</label>
          <input
            type="number"
            value={formData.minimumStock}
            onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) })}
          />
          <label>Size</label>
          <input
            type="text"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          />
        </div>

        <div className="form-row full">
          <label>Narration</label>
          <textarea
            value={formData.narration}
            onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
          />
        </div>

        <div className="form-row">
          <label>Tax</label>
          <input
            type="text"
            value={formData.tax}
            onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
          />
          <label>Opening Stock</label>
          <input
            type="number"
            value={formData.openingStock}
            onChange={(e) => setFormData({ ...formData, openingStock: parseInt(e.target.value) })}
          />
        </div>

        <div className="form-row">
          <label>Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <label>UOM</label>
          <div className="uom-wrapper">
            <select
              value={formData.uom}
              onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
            >
              <option value="">--select--</option>
              {uoms.map((u, idx) => (
                <option key={idx} value={u}>{u}</option>
              ))}
            </select>
            <button type="button" className="add-uom-btn" onClick={() => setShowUomModal(true)}>+</button>
          </div>
        </div>

        <div className="form-row">
          <label>Purchase Rate</label>
          <input
            type="number"
            value={formData.purchaseRate}
            onChange={(e) => setFormData({ ...formData, purchaseRate: parseFloat(e.target.value) })}
            step="0.01"
          />
          <label>Sale Rate</label>
          <input
            type="number"
            value={formData.saleRate}
            onChange={(e) => setFormData({ ...formData, saleRate: parseFloat(e.target.value) })}
            step="0.01"
          />
        </div>

        <button type="submit" className="submit-btn">Create Product</button>
      </form>

      {/* Modal for Adding UOM */}
      {showUomModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Add New Unit of Measure</h4>
            <input
              type="text"
              placeholder="Enter new UOM"
              value={newUom}
              onChange={(e) => setNewUom(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleUomAdd}>Add</button>
              <button onClick={() => setShowUomModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
