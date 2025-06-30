import React from 'react';
import { FaDollarSign, FaChartLine, FaUsers, FaFileInvoice } from 'react-icons/fa';
import StatsCard from '../../../components/Dashboard/Statecard';
import RecentActivity from '../../../components/Dashboard/RecentActivities';
import QuickActions from '../../../components/Dashboard/QuickAction';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { 
      title: "Total Revenue", 
      value: "$48,526", 
      change: "+12%", 
      icon: <FaDollarSign />,
      trend: 'up'
    },
    { 
      title: "Active Users", 
      value: "1,258", 
      change: "+5%", 
      icon: <FaUsers />,
      trend: 'up'
    },
    { 
      title: "Pending Invoices", 
      value: "42", 
      change: "-3%", 
      icon: <FaFileInvoice />,
      trend: 'down'
    },
    { 
      title: "Monthly Growth", 
      value: "18%", 
      change: "+4%", 
      icon: <FaChartLine />,
      trend: 'up'
    }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="dashboard-content">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;