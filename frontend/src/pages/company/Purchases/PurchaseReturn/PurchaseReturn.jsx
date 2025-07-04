import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PurchaseReturnList = () => {
  const navigate = useNavigate();
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    // Mock data
    setReturns([
      {
        id: 1,
        prNo: 'PR-2023-001',
        supplier: 'Tech Suppliers',
        piNo: 'PI-2023-001',
        subTotal: 1000,
        discount: 100,
        freight: 0,
        tax: 180,
        total: 1080,
        currency: 'USD',
        date: '2023-05-18',
        status: 'Pending'
      }
    ]);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Purchase Returns</h2>
        <button onClick={() => navigate('/company/purchases/return/create')} className="btn-primary">
          + Create Return
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>PR No</th>
            <th>Supplier</th>
            <th>PI No</th>
            <th>Sub Total</th>
            <th>Discount</th>
            <th>Freight</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Currency</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((r, index) => (
            <tr key={r.id}>
              <td>{index + 1}</td>
              <td>{r.prNo}</td>
              <td>{r.supplier}</td>
              <td>{r.piNo}</td>
              <td>{r.subTotal}</td>
              <td>{r.discount}</td>
              <td>{r.freight}</td>
              <td>{r.tax}</td>
              <td>{r.total}</td>
              <td>{r.currency}</td>
              <td>{r.date}</td>
              <td><span className={`status-${r.status.toLowerCase()}`}>{r.status}</span></td>
              <td>
                <button onClick={() => navigate(`/purchase-returns/${r.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseReturnList;