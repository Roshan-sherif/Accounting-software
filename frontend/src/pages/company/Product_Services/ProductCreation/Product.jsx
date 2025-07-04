import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const ProductListPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        {
          id: 1,
          srNo: 1,
          name: 'Wireless Mouse',
          category: 'Electronics',
          brand: 'TechPro',
          openingStock: 50,
          narration: 'Ergonomic wireless mouse',
          uom: 'Piece',
          purchaseRate: 450,
          saleRate: 599,
          status: 'Active'
        },
        // More mock data...
      ];
      
      setProducts(mockData);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // Filtering and pagination logic remains same as before...

  return (
    <div className="accounting-page">
      <div className="page-header">
        <h2>Products</h2>
        <div className="header-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="add-button"
            onClick={() => navigate('/company/products/product/create')}
          >
            + Add Product
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading products...</div>
      ) : (
        <>
          <div className="accounting-table-container">
            <table className="accounting-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Opening Stock</th>
                  <th>Narration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* <tbody>
                {currentItems.map((product) => (
                  <tr key={product.id}>
                    <td>{product.srNo}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.openingStock} {product.uom}</td>
                    <td className="narration-cell">{product.narration}</td>
                    <td>
                      <span className={`status-badge ${product.status.toLowerCase()}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => navigate(`/products/edit/${product.id}`)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
          {/* Pagination controls */}
        </>
      )}
    </div>
  );
};

export default ProductListPage;