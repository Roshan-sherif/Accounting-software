import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PurchaseOrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock data
    setOrders([
      {
        id: 1,
        poNo: 'PO-2023-001',
        supplier: 'Tech Suppliers',
        subTotal: 5000,
        discount: 500,
        freight: 200,
        tax: 900,
        total: 5600,
        currency: 'USD',
        date: '2023-05-16'
      }
    ]);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Purchase Orders</h2>
        <button onClick={() => navigate('/company/purchases/orders/create')} className="btn-primary">
          + Create Order
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>PO No</th>
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
          {orders.map((o, index) => (
            <tr key={o.id}>
              <td>{index + 1}</td>
              <td>{o.poNo}</td>
              <td>{o.supplier}</td>
              <td>{o.subTotal}</td>
              <td>{o.discount}</td>
              <td>{o.freight}</td>
              <td>{o.tax}</td>
              <td>{o.total}</td>
              <td>{o.currency}</td>
              <td>{o.date}</td>
              <td>
                <button onClick={() => navigate(`/purchase-orders/${o.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrderList;