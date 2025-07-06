import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderView = () => {
  const navigate = useNavigate();
  
  const orders = [
    {
      id: 1,
      orderNo: 'SO-2023-001',
      customer: 'ABC Traders',
      subtotal: 5000,
      discount: 500,
      shipping: 200,
      tax: 810,
      total: 5510,
      status: 'Processing',
      currency: 'USD',
      date: '2023-06-01',
      deliveryDate: '2023-06-10'
    },
    {
      id: 2,
      orderNo: 'SO-2023-002',
      customer: 'XYZ Corporation',
      subtotal: 7500,
      discount: 750,
      shipping: 300,
      tax: 1215,
      total: 8265,
      status: 'Shipped',
      currency: 'USD',
      date: '2023-06-05',
      deliveryDate: '2023-06-15'
    },
    // Add more sample records...
  ];

  return (
    <div className="order-view-container">
      <div className="header">
        <h2>Sales Orders</h2>
        <button 
          className="create-btn"
          onClick={() => navigate('/company/sales/order/create')}
        >
          Create Order
        </button>
      </div>

      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Order No</th>
              <th>Customer</th>
              <th>Subtotal</th>
              <th>Discount</th>
              <th>Shipping</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Status</th>
              <th>Currency</th>
              <th>Date</th>
              <th>Delivery Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.orderNo}</td>
                <td>{order.customer}</td>
                <td>{order.subtotal.toFixed(2)}</td>
                <td>{order.discount.toFixed(2)}</td>
                <td>{order.shipping.toFixed(2)}</td>
                <td>{order.tax.toFixed(2)}</td>
                <td>{order.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.currency}</td>
                <td>{order.date}</td>
                <td>{order.deliveryDate}</td>
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

export default OrderView;