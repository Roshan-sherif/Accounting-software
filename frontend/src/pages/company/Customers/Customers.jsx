import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Customers.css';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    taxId: '',
    contactPerson: '',
    creditLimit: '',
    paymentTerms: 'NET_30'
  });

  // Fetch customers (mock data for example)
  useEffect(() => {
    // Replace with actual API call
    const mockCustomers = [
      {
        id: 1,
        name: 'ABC Corporation',
        phone: '+1 (555) 123-4567',
        email: 'contact@abccorp.com',
        address: '123 Business Ave, New York, NY 10001',
        taxId: 'TAX-US-123456',
        contactPerson: 'John Smith',
        creditLimit: 50000,
        paymentTerms: 'NET_30'
      },
      // Add more mock customers as needed
    ];
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call to save customer
    if (currentCustomer) {
      // Update existing customer
      setCustomers(customers.map(c => 
        c.id === currentCustomer.id ? { ...formData, id: currentCustomer.id } : c
      ));
    } else {
      // Add new customer
      const newCustomer = { ...formData, id: customers.length + 1 };
      setCustomers([...customers, newCustomer]);
    }
    setIsModalOpen(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      taxId: '',
      contactPerson: '',
      creditLimit: '',
      paymentTerms: 'NET_30'
    });
  };

  const handleEdit = (customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      taxId: customer.taxId,
      contactPerson: customer.contactPerson,
      creditLimit: customer.creditLimit,
      paymentTerms: customer.paymentTerms
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  return (
    <div className="customer-page">
      <div className="page-header">
        <h2><FaUser /> Customer Management</h2>
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
          <button className="add-button" onClick={() => {
            setCurrentCustomer(null);
            setIsModalOpen(true);
          }}>
            <FaPlus /> Add Customer
          </button>
        </div>
      </div>

      <div className="customer-list">
        {filteredCustomers.length === 0 ? (
          <div className="empty-state">
            <p>No customers found. Add your first customer!</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Tax ID</th>
                <th>Credit Limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-name">
                      <FaUser className="user-icon" />
                      <div>
                        <strong>{customer.name}</strong>
                        <small>{customer.contactPerson}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div><FaPhone /> {customer.phone}</div>
                      <div><FaEnvelope /> {customer.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="address">
                      <FaMapMarkerAlt /> {customer.address}
                    </div>
                  </td>
                  <td>{customer.taxId}</td>
                  <td>${customer.creditLimit?.toLocaleString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(customer)}>
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDelete(customer.id)}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Customer Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tax ID</label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Credit Limit ($)</label>
                  <input
                    type="number"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Payment Terms</label>
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                  >
                    <option value="NET_15">NET 15</option>
                    <option value="NET_30">NET 30</option>
                    <option value="NET_60">NET 60</option>
                    <option value="DUE_ON_RECEIPT">Due on Receipt</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">
                  {currentCustomer ? 'Update' : 'Save'} Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;