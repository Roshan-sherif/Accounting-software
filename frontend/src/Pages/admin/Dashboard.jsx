import React from 'react';
import AdminNavbar from '../../Components/Admin_components/layout/AdminNavbar';
import AdminSidebar from '../../Components/Admin_components/layout/AdminSidebar';
import StatCard from '../../Components/Admin_components/common/StatCard';
import RecentActivity from '../../Components/Admin_components/common/RecentActivity';
import QuickActions from '../../Components/Admin_components/common/QuickAction';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Account Group Balance', 
      value: '$24,560', 
      change: '+12%', 
      icon: 'wallet',
      extra: 'Under: Balance Sheet'
    },
    { 
      title: 'Income, Expense & Profit', 
      value: '$8,420', 
      change: '+5%', 
      icon: 'chart-line'
    },
    { 
      title: 'Cash & Bank Balances', 
      value: '$15,230', 
      icon: 'university',
      accounts: [
        { name: 'Main Account', balance: '$10,000' },
        { name: 'Savings', balance: '$5,230' }
      ]
    },
    { 
      title: 'Total Sales', 
      value: '$12,780', 
      change: '+8%', 
      icon: 'shopping-cart'
    }
  ];

  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar />
        <div className="admin-content">
          <div className="dashboard-header">
            <h1>Dashboard Overview</h1>
            <div className="time-filter">
              <select>
                <option>Last Week</option>
                <option>Last Month</option>
                <option>Last Quarter</option>
              </select>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="dashboard-widgets">
            <div className="widget-col">
              <RecentActivity />
            </div>
            <div className="widget-col">
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;