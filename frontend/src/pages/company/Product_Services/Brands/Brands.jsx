import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Brands.css';

const BrandListPage = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        {
          id: 1,
          srNo: 1,
          name: 'TechPro',
          manufacturer: 'TechPro Inc.',
          description: 'Electronics manufacturer',
          status: 'Active'
        },
        {
          id: 2,
          srNo: 2,
          name: 'HomeEssentials',
          manufacturer: 'Home Products Ltd.',
          description: 'Household items manufacturer',
          status: 'Active'
        },
        // More mock data...
      ];
      
      setBrands(mockData);
      setIsLoading(false);
    };

    fetchBrands();
  }, []);

  // Filtering logic
  const filteredBrands = brands.filter(brand =>
    `${brand.name} ${brand.manufacturer} ${brand.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBrands.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="accounting-page">
      <div className="page-header">
        <h2>Brands</h2>
        <div className="header-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="add-button"
            onClick={() => navigate('/company/products/brands/add')}
          >
            + Add Brand
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading brands...</div>
      ) : (
        <>
          <div className="accounting-table-container">
            <table className="accounting-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Brand Name</th>
                  <th>Manufacturer</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((brand) => (
                    <tr key={brand.id}>
                      <td>{brand.srNo}</td>
                      <td>{brand.name}</td>
                      <td>{brand.manufacturer}</td>
                      <td className="description-cell">{brand.description}</td>
                      <td>
                        <span className={`status-badge ${brand.status.toLowerCase()}`}>
                          {brand.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => navigate(`/brands/edit/${brand.id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => console.log('Toggle status', brand.id)}
                          title={brand.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          {brand.status === 'Active' ? '❌' : '✅'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">
                      No brands found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredBrands.length > itemsPerPage && (
            <div className="pagination-controls">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrandListPage;