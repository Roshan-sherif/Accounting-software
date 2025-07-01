import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CurrencyPage.css';

const CurrencyListPage = () => {
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        {
          id: 1,
          srNo: 1,
          name: 'US Dollar',
          symbol: '$',
          decimalPlaces: 2,
          subUnit: 'Cent',
          narration: 'Primary transaction currency',
          isActive: true
        },
        {
          id: 2,
          srNo: 2,
          name: 'Euro',
          symbol: '€',
          decimalPlaces: 2,
          subUnit: 'Cent',
          narration: 'For European transactions',
          isActive: true
        },
        // More mock data...
      ];
      
      setCurrencies(mockData);
      setIsLoading(false);
    };

    fetchCurrencies();
  }, []);

  // Filtering logic
  const filteredCurrencies = currencies.filter(currency =>
    `${currency.name} ${currency.symbol} ${currency.subUnit}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCurrencies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCurrencies.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="accounting-page">
      <div className="page-header">
        <h2>Currencies</h2>
        <div className="header-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="add-button"
            onClick={() => navigate('/company/master/currency/add')}
          >
            + Add Currency
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading currencies...</div>
      ) : (
        <>
          <div className="accounting-table-container">
            <table className="accounting-table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Currency Name</th>
                  <th>Symbol</th>
                  <th>Decimal Places</th>
                  <th>Sub Unit</th>
                  <th>Narration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((currency) => (
                    <tr key={currency.id}>
                      <td>{currency.srNo}</td>
                      <td>{currency.name}</td>
                      <td className="currency-symbol">{currency.symbol}</td>
                      <td>{currency.decimalPlaces}</td>
                      <td>{currency.subUnit}</td>
                      <td className="narration-cell">{currency.narration}</td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => navigate(`/currencies/edit/${currency.id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => console.log('Toggle status', currency.id)}
                          title={currency.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {currency.isActive ? '❌' : '✅'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">
                      No currencies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredCurrencies.length > itemsPerPage && (
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

export default CurrencyListPage;