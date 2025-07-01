import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AccountingStyles.css';

const TransactionListPage = () => {
  const navigate = useNavigate();
  const { ledgerId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ledgerInfo, setLedgerInfo] = useState(null);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API calls
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 500)), // Transactions
        ledgerId && new Promise(resolve => setTimeout(resolve, 300)) // Ledger info
      ]);
      
      // Mock transactions data
      const mockTransactions = [
        {
          id: 1,
          date: '2023-05-15',
          ledgerId: 1,
          ledgerName: 'Cash Account',
          amount: 5000,
          type: 'Debit',
          reference: 'INV-1001',
          description: 'Customer payment',
          branchCode: 'BRNCH001',
          instrumentNumber: 'CHQ123456'
        },
        // More mock transactions...
      ];
      
      setTransactions(mockTransactions);
      
      if (ledgerId) {
        setLedgerInfo({
          id: 1,
          name: 'Cash Account',
          currentBalance: 75000,
          balanceType: 'Debit'
        });
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [ledgerId]);

  // Filter transactions
  const filteredTransactions = transactions
    .filter(t => 
      (ledgerId ? t.ledgerId === parseInt(ledgerId) : true) &&
      (filterType === 'All' || t.type === filterType) &&
      `${t.reference} ${t.description} ${t.instrumentNumber}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="accounting-page">
      <div className="page-header">
        {ledgerInfo ? (
          <div className="ledger-header-info">
            <h2>Transactions for {ledgerInfo.name}</h2>
            <div className="ledger-balance">
              Current Balance: 
              <span className={ledgerInfo.balanceType.toLowerCase()}>
                {ledgerInfo.currentBalance.toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <h2>All Transactions</h2>
        )}
        
        <div className="header-actions">
          <div className="search-filter-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <select
              className="type-filter"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Types</option>
              <option value="Debit">Debits</option>
              <option value="Credit">Credits</option>
            </select>
          </div>
          <button
            className="add-button"
            onClick={() => navigate(
              ledgerId 
                ? `/ledgers/${ledgerId}/transactions/new`
                : '/transactions/new'
            )}
          >
            + New Transaction
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading transactions...</div>
      ) : (
        <>
          <div className="accounting-table-container">
            <table className="accounting-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {!ledgerId && <th>Ledger</th>}
                  <th>Reference</th>
                  <th>Description</th>
                  <th>Instrument No.</th>
                  <th>Branch</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((transaction) => (
                    <tr key={transaction.id} className={`transaction-row ${transaction.type.toLowerCase()}`}>
                      <td>{transaction.date}</td>
                      {!ledgerId && (
                        <td>
                          {transaction.ledgerName}
                          <span className="ledger-code">({transaction.ledgerId})</span>
                        </td>
                      )}
                      <td>{transaction.reference || '-'}</td>
                      <td>{transaction.description}</td>
                      <td>
                        {transaction.instrumentNumber && (
                          <span className="instrument-number">
                            {transaction.instrumentNumber}
                          </span>
                        )}
                      </td>
                      <td>
                        <span className="branch-badge">
                          {transaction.branchCode}
                        </span>
                      </td>
                      <td className={transaction.type.toLowerCase()}>
                        {transaction.amount.toLocaleString()}
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => navigate(
                            ledgerId
                              ? `/ledgers/${ledgerId}/transactions/edit/${transaction.id}`
                              : `/transactions/edit/${transaction.id}`
                          )}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => console.log('View transaction', transaction.id)}
                          title="View"
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={ledgerId ? 7 : 8} className="no-results">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length > itemsPerPage && (
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

export default TransactionListPage;