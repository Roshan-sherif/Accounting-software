import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountLedger.css';

const LedgerListPage = () => {
  const navigate = useNavigate();
  const [ledgers, setLedgers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState(['All', 'BRNCH001', 'BRNCH002']);

  useEffect(() => {
    const fetchLedgers = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        {
          id: 1,
          ledgerCode: 'CASH-001',
          ledgerName: 'Main Cash Account',
          group: 'Current Assets',
          accountNumber: '1234567890',
          bankName: 'National Bank',
          branchCode: 'BRNCH001',
          branchName: 'Main Branch',
          ifscCode: 'NBIN1234567',
          openingBalance: 50000,
          balanceType: 'Debit',
          isActive: true
        },
        // More mock data...
      ];
      
      setLedgers(mockData);
      setIsLoading(false);
    };

    fetchLedgers();
  }, []);

  // Filtering logic
  const filteredLedgers = ledgers.filter(ledger =>
    `${ledger.ledgerName} ${ledger.ledgerCode} ${ledger.accountNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLedgers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLedgers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="accounting-page">
      <div className="page-header">
        <h2>Account Ledgers</h2>
        <div className="header-actions">
          <div className="search-filter-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search ledgers..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <select className="branch-filter">
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
          <button
            className="add-button"
            onClick={() => navigate('/company/master/ledgers/create')}
          >
            + Add New Ledger
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="accounting-table-container">
            <table className="accounting-table">
              <thead>
                <tr>
                  <th>Ledger Code</th>
                  <th>Ledger Name</th>
                  <th>Account No.</th>
                  <th>Branch</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((ledger) => (
                    <tr key={ledger.id}>
                      <td>{ledger.ledgerCode}</td>
                      <td>{ledger.ledgerName}</td>
                      <td>{ledger.accountNumber}</td>
                      <td>
                        <span className="branch-badge">
                          {ledger.branchCode}
                        </span>
                        {ledger.branchName}
                      </td>
                      <td className={ledger.balanceType.toLowerCase()}>
                        {ledger.openingBalance.toLocaleString()}
                      </td>
                      <td>
                        <span className={`status-badge ${
                          ledger.isActive ? 'status-active' : 'status-inactive'
                        }`}>
                          {ledger.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => navigate(`/ledgers/edit/${ledger.id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => navigate(`/ledgers/view/${ledger.id}`)}
                          title="View"
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">
                      No ledgers found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredLedgers.length > itemsPerPage && (
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

export default LedgerListPage;