import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnView = () => {
  const navigate = useNavigate();
  
  const returns = [
    {
      id: 1,
      returnNo: 'RTN-2023-001',
      customer: 'ABC Traders',
      invoiceNo: 'INV-2023-001',
      subtotal: 1000,
      restockingFee: 100,
      tax: 162,
      total: 1062,
      status: 'Processed',
      currency: 'USD',
      date: '2023-06-05',
      reason: 'Damaged',
      returnMethod: 'Refund'
    },
    {
      id: 2,
      returnNo: 'RTN-2023-002',
      customer: 'XYZ Corporation',
      invoiceNo: 'INV-2023-002',
      subtotal: 1500,
      restockingFee: 150,
      tax: 243,
      total: 1593,
      status: 'Pending',
      currency: 'USD',
      date: '2023-06-10',
      reason: 'Wrong Item',
      returnMethod: 'Exchange'
    },
    // Add more sample records...
  ];

  return (
    <div className="return-view-container">
      <div className="header">
        <h2>Sales Returns</h2>
        <button 
          className="create-btn"
          onClick={() => navigate('/company/sales/return/create')}
        >
          Create Return
        </button>
      </div>

      <div className="table-container">
        <table className="return-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Return No</th>
              <th>Customer</th>
              <th>Invoice No</th>
              <th>Subtotal</th>
              <th>Restocking Fee</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Method</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((ret, index) => (
              <tr key={ret.id}>
                <td>{index + 1}</td>
                <td>{ret.returnNo}</td>
                <td>{ret.customer}</td>
                <td>{ret.invoiceNo}</td>
                <td>{ret.subtotal.toFixed(2)}</td>
                <td>{ret.restockingFee.toFixed(2)}</td>
                <td>{ret.tax.toFixed(2)}</td>
                <td>{ret.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${ret.status.toLowerCase()}`}>
                    {ret.status}
                  </span>
                </td>
                <td>{ret.reason}</td>
                <td>{ret.returnMethod}</td>
                <td>{ret.date}</td>
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

export default ReturnView;