import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PriceListPage = () => {
  const navigate = useNavigate();
  const [priceList, setPriceList] = useState([]);

  useEffect(() => {
    // Mock data - replace with API call
    setPriceList([
      { id: 1, productName: 'Wireless Mouse' },
      { id: 2, productName: 'Keyboard' },
      { id: 3, productName: 'Monitor' }
    ]);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Purchase Price List</h2>
        <button onClick={() => navigate('/company/products/Purchase-Price-List/create')} className="btn-primary">
          + Add Price
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {priceList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.productName}</td>
              <td>
                <button 
                  onClick={() => navigate(`/pricelist/edit/${item.id}`)}
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

export default PriceListPage;