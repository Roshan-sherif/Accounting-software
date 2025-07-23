import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Customers.css';

const CustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect=()=>{
    
  }

  const customers = [
    {
      id: 1,
      srNo: 1,
      customerCode: 'roshamn',
      customerName: 'ABC Traders',
      nattation: 'Wholesale',
      email: 'contact@asdfsadfasdfadsc.com',
      phoneNumber: '9876543210',
      creditPeriod: '30 Days',
      creditLimit: '₹50,000'
    },
    {
      id: 2,
      srNo: 2,
      customerCode: 'CUST002',
      customerName: 'XYZ Enterprises',
      nattation: 'Retail',
      email: 'sales@xyz.com',
      phoneNumber: '8765432109',
      creditPeriod: '15 Days',
      creditLimit: '₹25,000'
    },
    {
      id: 3,
      srNo: 3,
      customerCode: 'CUST003',
      customerName: 'Global Solutions',
      nattation: 'Manufacturer',
      email: 'info@globalsol.com',
      phoneNumber: '7654321098',
      creditPeriod: '45 Days',
      creditLimit: '₹75,000'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="customer-page">
      <div className="page-header">
        <h2>Customer Management</h2>
        <div className="header-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/company/masters/customers/add" className="add-button">
            Add New Customer
          </Link>
        </div>
      </div>

      <div className="customer-table-container">
        <table className="compact-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Customer Code</th>
              <th>Customer Name</th>
              <th>Nattation</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Credit Period</th>
              <th>Credit Limit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.srNo}</td>
                <td>{customer.customerCode}</td>
                <td>{customer.customerName}</td>
                <td>{customer.nattation}</td>
                <td>{customer.email}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.creditPeriod}</td>
                <td>{customer.creditLimit}</td>
                <td>
                  <Link to={`/customers/edit/${customer.id}`} className="edit-link">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;