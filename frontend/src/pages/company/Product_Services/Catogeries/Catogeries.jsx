import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Catogeries.css';

const CategoryListPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        {
          id: 1,
          srNo: 1,
          name: 'Electronics',
          description: 'Electronic devices and components',
          isActive: true
        },
        {
          id: 2,
          srNo: 2,
          name: 'Office Supplies',
          description: 'Items for office use',
          isActive: true
        },
        // More mock data...
      ];
      
      setCategories(mockData);
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  // Filtering logic
  const filteredCategories = categories.filter(category =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="accounting-page">
      <div className="page-header">
        <h2>Product Categories</h2>
        <div className="header-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="add-button"
            onClick={() => navigate('/company/product-services/categories/create')}
          >
            + Add Category
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading categories...</div>
      ) : (
        <>
          <div className="accounting-table-container">
            <table className="accounting-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((category) => (
                    <tr key={category.id}>
                      <td>{category.srNo}</td>
                      <td>{category.name}</td>
                      <td className="description-cell">{category.description}</td>
                      <td>
                        <span className={`status-badge ${
                          category.isActive ? 'status-active' : 'status-inactive'
                        }`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => navigate(`/categories/edit/${category.id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => console.log('Toggle status', category.id)}
                          title={category.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {category.isActive ? '❌' : '✅'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredCategories.length > itemsPerPage && (
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

export default CategoryListPage;