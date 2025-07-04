import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PurchaseInvoiceList = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Mock data
    setInvoices([
      {
        id: 1,
        piNo: 'PI-2023-001',
        supplier: 'Tech Suppliers',
        subTotal: 5000,
        discount: 500,
        freight: 200,
        tax: 900,
        total: 5600,
        currency: 'USD',
        date: '2023-05-17'
      }
    ]);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Purchase Invoices</h2>
        <button onClick={() => navigate('/company/purchases/invoice/create')} className="btn-primary">
          + Create Invoice
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>PI No</th>
            <th>Supplier</th>
            <th>Sub Total</th>
            <th>Discount</th>
            <th>Freight</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Currency</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((i, index) => (
            <tr key={i.id}>
              <td>{index + 1}</td>
              <td>{i.piNo}</td>
              <td>{i.supplier}</td>
              <td>{i.subTotal}</td>
              <td>{i.discount}</td>
              <td>{i.freight}</td>
              <td>{i.tax}</td>
              <td>{i.total}</td>
              <td>{i.currency}</td>
              <td>{i.date}</td>
              <td>
                <button onClick={() => navigate(`/purchase-invoices/${i.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseInvoiceList;