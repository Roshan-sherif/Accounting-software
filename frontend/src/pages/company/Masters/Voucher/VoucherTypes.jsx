import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Voucher.css';

const VoucherTypeListPage = () => {
  const navigate = useNavigate();
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVoucherTypes = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        {
          id: 1,
          srNo: 1,
          voucherName: 'Payment Voucher',
          numberingMethod: 'Auto',
          voucherType: 'Payment',
          narration: 'For recording payments',
          isActive: true
        },
        {
          id: 2,
          srNo: 2,
          voucherName: 'Receipt Voucher',
          numberingMethod: 'Manual',
          voucherType: 'Receipt',
          narration: 'For recording receipts',
          isActive: true
        },
        // More mock data...
      ];
      
      setVoucherTypes(mockData);
      setIsLoading(false);
    };

    fetchVoucherTypes();
  }, []);

  // Filtering logic
  const filteredVouchers = voucherTypes.filter(voucher =>
    `${voucher.voucherName} ${voucher.voucherType}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVouchers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="accounting-page">
      <div className="page-header">
        <h2>Voucher Types</h2>
        <div className="header-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search voucher types..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="add-button"
            onClick={() => navigate('/company/master/voucher-type/add')}
          >
            + Add Voucher Type
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading voucher types...</div>
      ) : (
        <>
          <div className="accounting-table-container">
            <table className="accounting-table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Voucher Name</th>
                  <th>Numbering Method</th>
                  <th>Type</th>
                  <th>Narration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((voucher) => (
                    <tr key={voucher.id}>
                      <td>{voucher.srNo}</td>
                      <td>{voucher.voucherName}</td>
                      <td>{voucher.numberingMethod}</td>
                      <td>{voucher.voucherType}</td>
                      <td>{voucher.narration}</td>
                      <td>
                        <span className={`status-badge ${
                          voucher.isActive ? 'status-active' : 'status-inactive'
                        }`}>
                          {voucher.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => navigate(`/voucher-types/edit/${voucher.id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => console.log('Toggle status', voucher.id)}
                          title={voucher.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {voucher.isActive ? '❌' : '✅'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">
                      No voucher types found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredVouchers.length > itemsPerPage && (
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

export default VoucherTypeListPage;