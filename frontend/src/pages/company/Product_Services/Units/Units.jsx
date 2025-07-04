import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnitsListPage = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);

  useEffect(() => {
    // Mock data - replace with API call
    setUnits([
      { id: 1, name: 'Piece' },
      { id: 2, name: 'Kg' },
      { id: 3, name: 'Liter' }
    ]);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Units</h2>
        <button onClick={() => navigate('/company/products/units/add')} className="btn-primary">
          + Add Unit
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Unit Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, index) => (
            <tr key={unit.id}>
              <td>{index + 1}</td>
              <td>{unit.name}</td>
              <td>
                <button 
                  onClick={() => navigate(`/units/edit/${unit.id}`)}
                  className="btn-edit"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnitsListPage;