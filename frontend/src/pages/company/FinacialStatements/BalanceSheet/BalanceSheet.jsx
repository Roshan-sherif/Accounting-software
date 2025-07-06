import React, { useState } from 'react';
import './BalanceSheet.css';

const BalanceSheet = () => {
  const [filters, setFilters] = useState({
    financialYear: new Date().getFullYear(),
    period: 'Annual',
    asOfDate: new Date().toISOString().split('T')[0],
    currency: 'USD'
  });

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AED'];
  const periods = ['Annual', 'Quarterly', 'Monthly'];

  // Sample balance sheet data
  const [balanceSheetData, setBalanceSheetData] = useState({
    assets: {
      currentAssets: [
        { id: 1, name: 'Cash and Cash Equivalents', amount: 125000 },
        { id: 2, name: 'Accounts Receivable', amount: 85000 },
        { id: 3, name: 'Inventory', amount: 65000 },
        { id: 4, name: 'Prepaid Expenses', amount: 15000 },
        { id: 5, name: 'Short-term Investments', amount: 45000 },
      ],
      nonCurrentAssets: [
        { id: 6, name: 'Property, Plant and Equipment', amount: 350000 },
        { id: 7, name: 'Long-term Investments', amount: 75000 },
        { id: 8, name: 'Intangible Assets', amount: 50000 },
        { id: 9, name: 'Goodwill', amount: 25000 },
      ]
    },
    liabilities: {
      currentLiabilities: [
        { id: 10, name: 'Accounts Payable', amount: 45000 },
        { id: 11, name: 'Short-term Loans', amount: 35000 },
        { id: 12, name: 'Accrued Expenses', amount: 25000 },
        { id: 13, name: 'Taxes Payable', amount: 15000 },
      ],
      nonCurrentLiabilities: [
        { id: 14, name: 'Long-term Loans', amount: 150000 },
        { id: 15, name: 'Bonds Payable', amount: 100000 },
        { id: 16, name: 'Deferred Tax Liabilities', amount: 25000 },
      ]
    },
    equity: [
      { id: 17, name: 'Common Stock', amount: 200000 },
      { id: 18, name: 'Retained Earnings', amount: 125000 },
      { id: 19, name: 'Additional Paid-in Capital', amount: 75000 },
      { id: 20, name: 'Treasury Stock', amount: -25000 },
    ]
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const totalCurrentAssets = calculateTotal(balanceSheetData.assets.currentAssets);
  const totalNonCurrentAssets = calculateTotal(balanceSheetData.assets.nonCurrentAssets);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;

  const totalCurrentLiabilities = calculateTotal(balanceSheetData.liabilities.currentLiabilities);
  const totalNonCurrentLiabilities = calculateTotal(balanceSheetData.liabilities.nonCurrentLiabilities);
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;

  const totalEquity = calculateTotal(balanceSheetData.equity);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: filters.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = (format) => {
    console.log(`Exporting to ${format} format`);
    // Add export logic here
  };

  return (
    <div className="balance-sheet-container">
      <div className="header-section">
        <h2>Balance Sheet</h2>
        
        <div className="filters">
          <div className="filter-group">
            <label>Financial Year:</label>
            <select
              name="financialYear"
              value={filters.financialYear}
              onChange={handleFilterChange}
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Period:</label>
            <select
              name="period"
              value={filters.period}
              onChange={handleFilterChange}
            >
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>As of Date:</label>
            <input
              type="date"
              name="asOfDate"
              value={filters.asOfDate}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label>Currency:</label>
            <select
              name="currency"
              value={filters.currency}
              onChange={handleFilterChange}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="print-btn" onClick={handlePrint}>Print</button>
        <button className="export-btn" onClick={() => handleExport('PDF')}>Export PDF</button>
        <button className="export-btn" onClick={() => handleExport('Excel')}>Export Excel</button>
      </div>

      <div className="balance-sheet-report">
        <div className="company-header">
          <h3>ABC Company Inc.</h3>
          <p>Balance Sheet as of {new Date(filters.asOfDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>(Currency: {filters.currency})</p>
        </div>

        <div className="balance-sheet-grid">
          {/* Assets Section */}
          <div className="assets-section">
            <h4>Assets</h4>
            
            <div className="current-assets">
              <h5>Current Assets</h5>
              <table>
                <tbody>
                  {balanceSheetData.assets.currentAssets.map(asset => (
                    <tr key={asset.id}>
                      <td>{asset.name}</td>
                      <td className="amount">{formatCurrency(asset.amount)}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td>Total Current Assets</td>
                    <td className="amount">{formatCurrency(totalCurrentAssets)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="non-current-assets">
              <h5>Non-Current Assets</h5>
              <table>
                <tbody>
                  {balanceSheetData.assets.nonCurrentAssets.map(asset => (
                    <tr key={asset.id}>
                      <td>{asset.name}</td>
                      <td className="amount">{formatCurrency(asset.amount)}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td>Total Non-Current Assets</td>
                    <td className="amount">{formatCurrency(totalNonCurrentAssets)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="assets-total">
              <table>
                <tbody>
                  <tr className="grand-total-row">
                    <td>TOTAL ASSETS</td>
                    <td className="amount">{formatCurrency(totalAssets)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Liabilities & Equity Section */}
          <div className="liabilities-equity-section">
            <h4>Liabilities & Equity</h4>
            
            <div className="current-liabilities">
              <h5>Current Liabilities</h5>
              <table>
                <tbody>
                  {balanceSheetData.liabilities.currentLiabilities.map(liability => (
                    <tr key={liability.id}>
                      <td>{liability.name}</td>
                      <td className="amount">{formatCurrency(liability.amount)}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td>Total Current Liabilities</td>
                    <td className="amount">{formatCurrency(totalCurrentLiabilities)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="non-current-liabilities">
              <h5>Non-Current Liabilities</h5>
              <table>
                <tbody>
                  {balanceSheetData.liabilities.nonCurrentLiabilities.map(liability => (
                    <tr key={liability.id}>
                      <td>{liability.name}</td>
                      <td className="amount">{formatCurrency(liability.amount)}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td>Total Non-Current Liabilities</td>
                    <td className="amount">{formatCurrency(totalNonCurrentLiabilities)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="equity">
              <h5>Equity</h5>
              <table>
                <tbody>
                  {balanceSheetData.equity.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="amount">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td>Total Equity</td>
                    <td className="amount">{formatCurrency(totalEquity)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="liabilities-equity-total">
              <table>
                <tbody>
                  <tr className="grand-total-row">
                    <td>TOTAL LIABILITIES & EQUITY</td>
                    <td className="amount">{formatCurrency(totalLiabilitiesAndEquity)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="balance-check">
          {totalAssets === totalLiabilitiesAndEquity ? (
            <p className="balanced">The balance sheet is balanced.</p>
          ) : (
            <p className="unbalanced">Warning: The balance sheet does not balance!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;