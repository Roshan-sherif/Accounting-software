import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Customers.css';

const AddCustomer = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call will go here
    navigate('/customers');
  };

  return (
    <div className="customer-form-page">
      <h2>Add New Customer</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Customer Name</label>
              <input type="text" name="customerName" required />
            </div>
            <div className="form-group">
              <label>Customer Code</label>
              <input type="text" name="customerCode" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Credit Period</label>
              <select name="creditPeriod">
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
              <label>Phone Number</label>
              <input type="tel" name="phoneNumber" />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input type="tel" name="mobile" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" />
            </div>
            <div className="form-group">
              <label>Nattation</label>
              <input type="text" name="nattation" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>TIN</label>
              <input type="text" name="tin" />
            </div>
            <div className="form-group">
              <label>CST No</label>
              <input type="text" name="cstNo" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>PAN</label>
              <input type="text" name="pan" />
            </div>
            <div className="form-group">
              <label>Bank Account No</label>
              <input type="text" name="bankAccNum" />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/customers')}>
            Cancel
          </button>
          <button type="submit">Save Customer</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;