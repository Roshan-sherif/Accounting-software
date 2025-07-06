import React, { useState } from 'react';
import './ProfitAndLoss.css';

const ProfitAndLoss = () => {
  const [filters, setFilters] = useState({
    financialYear: new Date().getFullYear(),
    period: 'Annual',
    fromDate: `${new Date().getFullYear()}-01-01`,
    toDate: new Date().toISOString().split('T')[0],
    currency: 'USD',
    comparison: false,
    previousPeriod: `${new Date().getFullYear() - 1}-01-01`
  });

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AED'];
  const periods = ['Annual', 'Quarterly', 'Monthly', 'Custom'];

  // Sample P&L data
  const [profitAndLossData, setProfitAndLossData] = useState({
    revenue: [
      { id: 1, name: 'Product Sales', amount: 500000, prevAmount: 450000 },
      { id: 2, name: 'Service Revenue', amount: 250000, prevAmount: 200000 },
      { id: 3, name: 'Other Income', amount: 50000, prevAmount: 40000 },
    ],
    costOfGoodsSold: [
      { id: 4, name: 'Raw Materials', amount: 200000, prevAmount: 180000 },
      { id: 5, name: 'Direct Labor', amount: 100000, prevAmount: 90000 },
      { id: 6, name: 'Manufacturing Overhead', amount: 50000, prevAmount: 45000 },
    ],
    operatingExpenses: [
      { id: 7, name: 'Salaries and Wages', amount: 150000, prevAmount: 140000 },
      { id: 8, name: 'Rent Expense', amount: 60000, prevAmount: 60000 },
      { id: 9, name: 'Utilities', amount: 20000, prevAmount: 18000 },
      { id: 10, name: 'Marketing', amount: 30000, prevAmount: 25000 },
      { id: 11, name: 'Depreciation', amount: 25000, prevAmount: 20000 },
      { id: 12, name: 'Other Expenses', amount: 15000, prevAmount: 10000 },
    ],
    otherIncomeExpenses: [
      { id: 13, name: 'Interest Income', amount: 10000, prevAmount: 8000 },
      { id: 14, name: 'Interest Expense', amount: -15000, prevAmount: -12000 },
      { id: 15, name: 'Gain/Loss on Sale', amount: 5000, prevAmount: -2000 },
    ],
    taxes: { amount: 75000, prevAmount: 60000 }
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculatePrevTotal = (items) => {
    return items.reduce((sum, item) => sum + item.prevAmount, 0);
  };

  const totalRevenue = calculateTotal(profitAndLossData.revenue);
  const prevTotalRevenue = calculatePrevTotal(profitAndLossData.revenue);

  const totalCOGS = calculateTotal(profitAndLossData.costOfGoodsSold);
  const prevTotalCOGS = calculatePrevTotal(profitAndLossData.costOfGoodsSold);

  const grossProfit = totalRevenue - totalCOGS;
  const prevGrossProfit = prevTotalRevenue - prevTotalCOGS;

  const totalOperatingExpenses = calculateTotal(profitAndLossData.operatingExpenses);
  const prevTotalOperatingExpenses = calculatePrevTotal(profitAndLossData.operatingExpenses);

  const operatingIncome = grossProfit - totalOperatingExpenses;
  const prevOperatingIncome = prevGrossProfit - prevTotalOperatingExpenses;

  const totalOtherIncomeExpenses = calculateTotal(profitAndLossData.otherIncomeExpenses);
  const prevTotalOtherIncomeExpenses = calculatePrevTotal(profitAndLossData.otherIncomeExpenses);

  const incomeBeforeTax = operatingIncome + totalOtherIncomeExpenses;
  const prevIncomeBeforeTax = prevOperatingIncome + prevTotalOtherIncomeExpenses;

  const netIncome = incomeBeforeTax - profitAndLossData.taxes.amount;
  const prevNetIncome = prevIncomeBeforeTax - profitAndLossData.taxes.prevAmount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: filters.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 'N/A';
    const change = ((current - previous) / Math.abs(previous)) * 100;
    return `${change.toFixed(2)}%`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = (format) => {
    console.log(`Exporting to ${format} format`);
    // Add export logic here
  };

  return (
    <div className="profit-and-loss-container">
      <div className="header-section">
        <h2>Profit and Loss Statement</h2>
        
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
            <label>From Date:</label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label>To Date:</label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
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
          
          <div className="filter-group checkbox">
            <label>
              <input
                type="checkbox"
                name="comparison"
                checked={filters.comparison}
                onChange={handleFilterChange}
              />
              Show Comparison
            </label>
          </div>
          
          {filters.comparison && (
            <div className="filter-group">
              <label>Compare With:</label>
              <input
                type="date"
                name="previousPeriod"
                value={filters.previousPeriod}
                onChange={handleFilterChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <button className="print-btn" onClick={handlePrint}>Print</button>
        <button className="export-btn" onClick={() => handleExport('PDF')}>Export PDF</button>
        <button className="export-btn" onClick={() => handleExport('Excel')}>Export Excel</button>
      </div>

      <div className="profit-and-loss-report">
        <div className="company-header">
          <h3>ABC Company Inc.</h3>
          <p>Profit and Loss Statement for the period {new Date(filters.fromDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} to {new Date(filters.toDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>(Currency: {filters.currency})</p>
        </div>

        <div className="profit-and-loss-table">
          <table>
            <thead>
              <tr>
                <th className="description">Description</th>
                <th className="amount">Amount</th>
                {filters.comparison && (
                  <>
                    <th className="amount">Previous Period</th>
                    <th className="amount">Change</th>
                  </>
                )}
              </tr>
            </thead>
            
            <tbody>
              {/* Revenue Section */}
              <tr className="section-header">
                <td colSpan={filters.comparison ? 4 : 2}>Revenue</td>
              </tr>
              
              {profitAndLossData.revenue.map(item => (
                <tr key={item.id}>
                  <td className="description">{item.name}</td>
                  <td className="amount">{formatCurrency(item.amount)}</td>
                  {filters.comparison && (
                    <>
                      <td className="amount">{formatCurrency(item.prevAmount)}</td>
                      <td className={`amount ${item.amount >= item.prevAmount ? 'positive' : 'negative'}`}>
                        {calculatePercentageChange(item.amount, item.prevAmount)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              
              <tr className="total-row">
                <td className="description">Total Revenue</td>
                <td className="amount">{formatCurrency(totalRevenue)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(prevTotalRevenue)}</td>
                    <td className={`amount ${totalRevenue >= prevTotalRevenue ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(totalRevenue, prevTotalRevenue)}
                    </td>
                  </>
                )}
              </tr>
              
              {/* Cost of Goods Sold Section */}
              <tr className="section-header">
                <td colSpan={filters.comparison ? 4 : 2}>Cost of Goods Sold</td>
              </tr>
              
              {profitAndLossData.costOfGoodsSold.map(item => (
                <tr key={item.id}>
                  <td className="description">{item.name}</td>
                  <td className="amount">{formatCurrency(item.amount)}</td>
                  {filters.comparison && (
                    <>
                      <td className="amount">{formatCurrency(item.prevAmount)}</td>
                      <td className={`amount ${item.amount <= item.prevAmount ? 'positive' : 'negative'}`}>
                        {calculatePercentageChange(item.amount, item.prevAmount)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              
              <tr className="total-row">
                <td className="description">Total Cost of Goods Sold</td>
                <td className="amount">{formatCurrency(totalCOGS)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(prevTotalCOGS)}</td>
                    <td className={`amount ${totalCOGS <= prevTotalCOGS ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(totalCOGS, prevTotalCOGS)}
                    </td>
                  </>
                )}
              </tr>
              
              {/* Gross Profit Section */}
              <tr className="section-total">
                <td className="description">Gross Profit</td>
                <td className="amount">{formatCurrency(grossProfit)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(prevGrossProfit)}</td>
                    <td className={`amount ${grossProfit >= prevGrossProfit ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(grossProfit, prevGrossProfit)}
                    </td>
                  </>
                )}
              </tr>
              
              {/* Operating Expenses Section */}
              <tr className="section-header">
                <td colSpan={filters.comparison ? 4 : 2}>Operating Expenses</td>
              </tr>
              
              {profitAndLossData.operatingExpenses.map(item => (
                <tr key={item.id}>
                  <td className="description">{item.name}</td>
                  <td className="amount">{formatCurrency(item.amount)}</td>
                  {filters.comparison && (
                    <>
                      <td className="amount">{formatCurrency(item.prevAmount)}</td>
                      <td className={`amount ${item.amount <= item.prevAmount ? 'positive' : 'negative'}`}>
                        {calculatePercentageChange(item.amount, item.prevAmount)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              
              <tr className="total-row">
                <td className="description">Total Operating Expenses</td>
                <td className="amount">{formatCurrency(totalOperatingExpenses)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(prevTotalOperatingExpenses)}</td>
                    <td className={`amount ${totalOperatingExpenses <= prevTotalOperatingExpenses ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(totalOperatingExpenses, prevTotalOperatingExpenses)}
                    </td>
                  </>
                )}
              </tr>
              
              {/* Operating Income Section */}
              <tr className="section-total">
                <td className="description">Operating Income</td>
                <td className="amount">{formatCurrency(operatingIncome)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(prevOperatingIncome)}</td>
                    <td className={`amount ${operatingIncome >= prevOperatingIncome ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(operatingIncome, prevOperatingIncome)}
                    </td>
                  </>
                )}
              </tr>
              
              {/* Other Income & Expenses Section */}
              <tr className="section-header">
                <td colSpan={filters.comparison ? 4 : 2}>Other Income & Expenses</td>
              </tr>
              
              {profitAndLossData.otherIncomeExpenses.map(item => (
                <tr key={item.id}>
                  <td className="description">{item.name}</td>
                  <td className="amount">{formatCurrency(item.amount)}</td>
                  {filters.comparison && (
                    <>
                      <td className="amount">{formatCurrency(item.prevAmount)}</td>
                      <td className={`amount ${item.amount >= item.prevAmount ? 'positive' : 'negative'}`}>
                        {calculatePercentageChange(item.amount, item.prevAmount)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              
              <tr className="total-row">
                <td className="description">Total Other Income & Expenses</td>
                <td className="amount">{formatCurrency(totalOtherIncomeExpenses)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(prevTotalOtherIncomeExpenses)}</td>
                    <td className={`amount ${totalOtherIncomeExpenses >= prevTotalOtherIncomeExpenses ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(totalOtherIncomeExpenses, prevTotalOtherIncomeExpenses)}
                    </td>
                  </>
                )}
              </tr>
              
              {/* Income Before Tax Section */}
              <tr className="section-total">
                <td className="description">Income Before Tax</td>
                <td className="amount">{formatCurrency(incomeBeforeTax)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(prevIncomeBeforeTax)}</td>
                    <td className={`amount ${incomeBeforeTax >= prevIncomeBeforeTax ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(incomeBeforeTax, prevIncomeBeforeTax)}
                    </td>
                  </>
                )}
              </tr>
              
              {/* Taxes Section */}
              <tr>
                <td className="description">Income Tax Expense</td>
                <td className="amount">{formatCurrency(profitAndLossData.taxes.amount)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(profitAndLossData.taxes.prevAmount)}</td>
                    <td className={`amount ${profitAndLossData.taxes.amount <= profitAndLossData.taxes.prevAmount ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(profitAndLossData.taxes.amount, profitAndLossData.taxes.prevAmount)}
                    </td>
                  </>
                )}
              </tr>
              
              {/* Net Income Section */}
              <tr className="grand-total">
                <td className="description">Net Income</td>
                <td className="amount">{formatCurrency(netIncome)}</td>
                {filters.comparison && (
                  <>
                    <td className="amount">{formatCurrency(prevNetIncome)}</td>
                    <td className={`amount ${netIncome >= prevNetIncome ? 'positive' : 'negative'}`}>
                      {calculatePercentageChange(netIncome, prevNetIncome)}
                    </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitAndLoss;