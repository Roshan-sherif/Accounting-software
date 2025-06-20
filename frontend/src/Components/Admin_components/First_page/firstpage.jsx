import React, { useState, useEffect } from 'react';
import { FaBuilding, FaPlus, FaDatabase, FaChevronDown, FaCheck } from 'react-icons/fa';
import './firstpage.css'
import { useNavigate } from 'react-router-dom';


const CompanyManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('select');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: '',
    employees: '',
    location: ''
  });
  const [backupFile, setBackupFile] = useState(null);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const mockCompanies = [
      { id: 1, name: 'Tech Innovations Inc.', industry: 'Technology', employees: 250, location: 'San Francisco' },
      { id: 2, name: 'Green Energy Solutions', industry: 'Energy', employees: 180, location: 'Denver' },
      { id: 3, name: 'Global Logistics Partners', industry: 'Transportation', employees: 420, location: 'Chicago' },
      { id: 4, name: 'HealthPlus Medical', industry: 'Healthcare', employees: 350, location: 'Boston' },
    ];
    setCompanies(mockCompanies);
  }, []);

  const handleCreateCompany = (e) => {
    e.preventDefault();
    const newId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
    const company = { id: newId, ...newCompany, employees: parseInt(newCompany.employees) };
    setCompanies([...companies, company]);
    setNewCompany({ name: '', industry: '', employees: '', location: '' });
    setActiveTab('select');
    setSelectedCompany(company);
  };
const HandleClicke=()=>{
    navigate('/admin/create_company')
}
  const handleRestore = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setRestoreSuccess(true);
      setTimeout(() => setRestoreSuccess(false), 3000);
    }, 1500);
  };

  const handleQuit = () => {
    alert('You have successfully quit the application. Redirecting to login...');
  };

  return (
    <div className="cms-container">
      
      <main className="cms-main">
        <div className="tab-container">
          <button
            onClick={() => setActiveTab('select') }
            className={`tab-button ${activeTab === 'select' ? 'active-tab' : ''}`}
          >
            <FaBuilding className="tab-icon" />
            Select Company
          </button>
          <button
            onClick={HandleClicke}
            className={`tab-button ${activeTab === 'create' ? 'active-tab' : ''}`}
          >
            <FaPlus className="tab-icon" />
            Create New
          </button>
          <button
            onClick={() => setActiveTab('restore')}
            className={`tab-button ${activeTab === 'restore' ? 'active-tab' : ''}`}
          >
            <FaDatabase className="tab-icon" />
            Restore
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`tab-button ${activeTab === 'backup' ? 'active-tab' : ''}`}
          >
            <FaDatabase className="tab-icon" />
            Backup
          </button>

        </div>

        {/* Rest of your existing tab content remains the same */}
        {/* ... */}
      </main>
    </div>
  );
};

export default CompanyManagementSystem;