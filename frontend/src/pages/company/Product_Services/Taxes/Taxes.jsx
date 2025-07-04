import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxesListPage = () => {
  const navigate = useNavigate();
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    // Mock data - replace with API call
    setTaxes([
      { id: 1, name: 'GST 5%', rate: 5, status: 'Active' },
      { id: 2, name: 'GST 12%', rate: 12, status: 'Active' },
      { id: 3, name: 'GST 18%', rate: 18, status: 'Inactive' }
    ]);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Taxes</h2>
        <button onClick={() => navigate('/company/products/taxes/create')} className="btn-primary">
          + Add Tax
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Tax Title</th>
            <th>Tax Value</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax, index) => (
            <tr key={tax.id}>
              <td>{index + 1}</td>
              <td>{tax.name}</td>
              <td>{tax.rate}%</td>
              <td>
                <span className={`status-badge ${tax.status.toLowerCase()}`}>
                  {tax.status}
                </span>
              </td>
              <td>
                <button 
                  onClick={() => navigate(`/taxes/edit/${tax.id}`)}
                  className="btn-edit"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxesListPage;