import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Suppliers.css';

const SupplierList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const suppliers = [
    {
      id: 1,
      srNo: 1,
      supplierCode: 'SUP001',
      supplierName: 'ABC Materials',
      nattation: 'Wholesaler',
      email: 'contact@abcmaterials.com',
      phoneNumber: '9876543210',
      creditPeriod: '30 Days',
      creditLimit: '₹1,00,000'
    },
    {
      id: 2,
      srNo: 2,
      supplierCode: 'SUP002',
      supplierName: 'XYZ Traders',
      nattation: 'Manufacturer',
      email: 'info@xyztraders.com',
      phoneNumber: '8765432109',
      creditPeriod: '45 Days',
      creditLimit: '₹2,50,000'
    },
    {
      id: 3,
      srNo: 3,
      supplierCode: 'SUP003',
      supplierName: 'Global Suppliers',
      nattation: 'Importer',
      email: 'sales@globalsuppliers.com',
      phoneNumber: '7654321098',
      creditPeriod: '60 Days',
      creditLimit: '₹5,00,000'
    }
  ];
useEffect(()=>{
  console.log('ho')
})
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplierCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="supplier-page">
      <div className="page-header">
        <h2>Supplier Management</h2>
        <div className="header-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/company/master/suppliers/add" className="add-button">
            Add New Supplier
          </Link>
        </div>
      </div>

      <div className="supplier-table-container">
        <table className="compact-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Supplier Code</th>
              <th>Supplier Name</th>
              <th>Nattation</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Credit Period</th>
              <th>Credit Limit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map(supplier => (
              <tr key={supplier.id}>
                <td>{supplier.srNo}</td>
                <td>{supplier.supplierCode}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.nattation}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phoneNumber}</td>
                <td>{supplier.creditPeriod}</td>
                <td>{supplier.creditLimit}</td>
                <td>
                  <Link to={`/suppliers/edit/${supplier.id}`} className="edit-link">
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

export default SupplierList;