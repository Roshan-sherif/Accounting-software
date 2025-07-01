import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './AccountingGroup.css';

const AccountGroupList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data - replace with API data later
  const accountGroups = [
    { id: 1, groupCode: 'AG001', groupName: 'Current Assets', groupType: 'Assets', parentGroup: 'Assets' },
    { id: 2, groupCode: 'AG002', groupName: 'Fixed Assets', groupType: 'Assets', parentGroup: 'Assets' },
    { id: 3, groupCode: 'AG003', groupName: 'Current Liabilities', groupType: 'Liabilities', parentGroup: 'Liabilities' },
    { id: 4, groupCode: 'AG004', groupName: 'Direct Income', groupType: 'Income', parentGroup: 'Income' },
    { id: 5, groupCode: 'AG005', groupName: 'Indirect Expenses', groupType: 'Expenses', parentGroup: 'Expenses' },
  ];

  const filteredGroups = accountGroups.filter(group =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.groupCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="account-group-page">
      <div className="page-header">
        <h2>Account Groups</h2>
        <div className="header-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search account groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/company/master/account-groups/add" className="add-button">
            <FaPlus /> Create Group
          </Link>
        </div>
      </div>

      <div className="account-group-table-container">
        <table className="compact-table">
          <thead>
            <tr>
              <th>Group Code</th>
              <th>Group Name</th>
              <th>Group Type</th>
              <th>Parent Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map(group => (
              <tr key={group.id}>
                <td>{group.groupCode}</td>
                <td>{group.groupName}</td>
                <td>{group.groupType}</td>
                <td>{group.parentGroup}</td>
                <td>
                  <Link to={`/account-groups/edit/${group.id}`} className="edit-link">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountGroupList;