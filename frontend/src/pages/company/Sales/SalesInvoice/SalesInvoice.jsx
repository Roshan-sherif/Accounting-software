import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesInvoice.css';

const InvoiceView = () => {
  const navigate = useNavigate();
  
  const invoices = [
    {
      id: 1,
      invoiceNo: 'INV-2023-001',
      customer: 'ABC Traders',
      subtotal: 5000,
      discount: 500,
      freight: 200,
      tax: 810,
      total: 5510,
      status: 'Paid',
      currency: 'USD',
      date: '2023-06-01',
      dueDate: '2023-06-15'
    },
    {
      id: 2,
      invoiceNo: 'INV-2023-002',
      customer: 'XYZ Corporation',
      subtotal: 7500,
      discount: 750,
      freight: 300,
      tax: 1215,
      total: 8265,
      status: 'Pending',
      currency: 'USD',
      date: '2023-06-05',
      dueDate: '2023-06-20'
    },
    // Add more sample records...
  ];

  return (
    <div className="invoice-view-container">
      <div className="header">
        <h2>Sales Invoices</h2>
        <button 
          className="create-btn"
          onClick={() => navigate('/company/sales/invoice/create')}
        >
          Create Invoice
        </button>
      </div>

      <div className="table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Invoice No</th>
              <th>Customer</th>
              <th>Subtotal</th>
              <th>Discount</th>
              <th>Freight</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Status</th>
              <th>Currency</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={invoice.id}>
                <td>{index + 1}</td>
                <td>{invoice.invoiceNo}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.subtotal.toFixed(2)}</td>
                <td>{invoice.discount.toFixed(2)}</td>
                <td>{invoice.freight.toFixed(2)}</td>
                <td>{invoice.tax.toFixed(2)}</td>
                <td>{invoice.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>{invoice.currency}</td>
                <td>{invoice.date}</td>
                <td>{invoice.dueDate}</td>
                <td>
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn print">Print</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceView;