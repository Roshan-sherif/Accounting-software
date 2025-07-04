import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PurchaseQuotationList = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    // Mock data
    setQuotations([
      {
        id: 1,
        pqNo: 'PQ-2023-001',
        supplier: 'Tech Suppliers',
        subTotal: 5000,
        discount: 500,
        freight: 200,
        tax: 900,
        total: 5600,
        status: 'Pending',
        currency: 'USD',
        date: '2023-05-15'
      }
    ]);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Purchase Quotations</h2>
        <button onClick={() => navigate('/company/purchases/quotation/create')} className="btn-primary">
          + Create Quotation
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>PQ No</th>
            <th>Supplier</th>
            <th>Sub Total</th>
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
          {quotations.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.pqNo}</td>
              <td>{q.supplier}</td>
              <td>{q.subTotal}</td>
              <td>{q.discount}</td>
              <td>{q.freight}</td>
              <td>{q.tax}</td>
              <td>{q.total}</td>
              <td><span className={`status-${q.status.toLowerCase()}`}>{q.status}</span></td>
              <td>{q.currency}</td>
              <td>{q.date}</td>
              <td>
                <button onClick={() => navigate(`/purchase-quotations/${q.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseQuotationList;