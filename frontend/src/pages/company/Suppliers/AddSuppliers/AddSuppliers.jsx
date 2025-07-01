import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Suppliers.css';

const AddSupplier = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/suppliers');
  };

  return (
    <div className="supplier-form-page">
      <h2>Add New Supplier</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Supplier Name*</label>
              <input type="text" name="supplierName" required />
            </div>
            <div className="form-group">
              <label>Supplier Code*</label>
              <input type="text" name="supplierCode" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Credit Period</label>
              <select name="creditPeriod">
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
                <option value="45">45 Days</option>
                <option value="60">60 Days</option>
              </select>
            </div>
            <div className="form-group">
              <label>Credit Limit (₹)</label>
              <input type="number" name="creditLimit" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Mailing Name</label>
              <input type="text" name="mailingName" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bill by Bill</label>
              <select name="billByBill">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Branch Name</label>
              <input type="text" name="branchName" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mobile</label>
              <input type="tel" name="mobile" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Financial Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Bank Account Number</label>
              <input type="text" name="bankAccNum" />
            </div>
            <div className="form-group">
              <label>TIN</label>
              <input type="text" name="tin" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Narration</label>
              <input type="text" name="narraton" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phoneNumber" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>CST No</label>
              <input type="text" name="cstNo" />
            </div>
            <div className="form-group">
              <label>PAN</label>
              <input type="text" name="pan" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Opening Balance</label>
              <input type="number" name="openingBalance" />
            </div>
            <div className="form-group">
              <label>Route ID</label>
              <input type="text" name="routeId" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Area ID</label>
              <input type="text" name="areaId" />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea name="address" rows="3"></textarea>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/suppliers')}>
            Cancel
          </button>
          <button type="submit">Save Supplier</button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;