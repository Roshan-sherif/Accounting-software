import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesQuatation.css';

const QuotationView = () => {
  const navigate = useNavigate();
  
  const quotations = [
    {
      id: 1,
      quotationNo: 'SQ-2023-001',
      customer: 'ABC Traders',
      subtotal: 5000,
      discount: 500,
      freight: 200,
      tax: 810,
      total: 5510,
      status: 'Pending',
      currency: 'USD',
      date: '2023-06-01'
    },
    // Add 4-5 more sample records...
  ];

  return (
    <div className="quotation-view-container">
      <div className="header">
        <h2>Sales Quotations</h2>
        <button 
          className="create-btn"
          onClick={() => navigate('/company/sales/quotation/create')}
        >
          Create Quotation
        </button>
      </div>

      <div className="table-container">
        <table className="quotation-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Quotation No</th>
              <th>Customer</th>
              <th>Subtotal</th>
              <th>Discount</th>
              <th>Freight</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Status</th>
              <th>Currency</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quote, index) => (
              <tr key={quote.id}>
                <td>{index + 1}</td>
                <td>{quote.quotationNo}</td>
                <td>{quote.customer}</td>
                <td>{quote.subtotal.toFixed(2)}</td>
                <td>{quote.discount.toFixed(2)}</td>
                <td>{quote.freight.toFixed(2)}</td>
                <td>{quote.tax.toFixed(2)}</td>
                <td>{quote.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${quote.status.toLowerCase()}`}>
                    {quote.status}
                  </span>
                </td>
                <td>{quote.currency}</td>
                <td>{quote.date}</td>
                <td>
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotationView;