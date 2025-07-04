import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PriceListForm = () => {
  const navigate = useNavigate();
  const [products] = useState([
    { id: 1, name: 'Wireless Mouse', barcode: '123456' },
    { id: 2, name: 'Keyboard', barcode: '789012' }
  ]);
  const [uoms] = useState(['Piece', 'Kg', 'Liter']);
  const [formData, setFormData] = useState({
    barcode: '',
    productId: '',
    uom: '',
    purchaseRate: '',
    saleRate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    navigate('/pricelist');
  };

  return (
    <div className="container">
      <h2>Add Purchase Price</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Barcode</label>
          <input
            type="text"
            value={formData.barcode}
            onChange={(e) => setFormData({...formData, barcode: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Select Product</label>
          <select
            value={formData.productId}
            onChange={(e) => setFormData({...formData, productId: e.target.value})}
            required
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.barcode})
              </option>
            ))}
          </select>
        </div>

        <div className="price-grid">
          <div className="grid-header">
            <div>UOM</div>
            <div>Purchase Rate</div>
            <div>Sale Rate</div>
            <div>Action</div>
          </div>
          <div className="grid-row">
            <div>
              <select
                value={formData.uom}
                onChange={(e) => setFormData({...formData, uom: e.target.value})}
                required
              >
                <option value="">Select UOM</option>
                {uoms.map(uom => (
                  <option key={uom} value={uom}>{uom}</option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                value={formData.purchaseRate}
                onChange={(e) => setFormData({...formData, purchaseRate: e.target.value})}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <input
                type="number"
                value={formData.saleRate}
                onChange={(e) => setFormData({...formData, saleRate: e.target.value})}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <button type="submit" className="btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/pricelist')} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriceListForm;