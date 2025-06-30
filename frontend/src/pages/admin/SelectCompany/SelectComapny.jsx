import { useCompany } from '../../../contexts/CompanyContext';
import { useNavigate } from 'react-router-dom';

const SelectCompany = () => {
  const { companies, switchCompany } = useCompany();
  const navigate = useNavigate();

  const handleSelect = (companyId) => {
    switchCompany(companyId);
    navigate(`/admin/companies/${companyId}`); // Redirect to company dashboard
  };

  return (
    <div className="company-selection">
      {companies.map(company => (
        <div 
          key={company.id}
          onClick={() => handleSelect(company.id)}
          className="company-card"
        >
          <h3>{company.name}</h3>
          <p>{company.industry}</p>
        </div>
      ))}
    </div>
  );
};