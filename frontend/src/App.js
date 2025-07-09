import './App.css';
import Login from './pages/login/login';
import AdminRoutes from './routes/AdminRoutes';
import CompanyRoutes from './routes/CompanyRoutes';
import { Routes, Route } from 'react-router-dom';





function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/login/" element={<Login />} />

              <Route path="/admin/*" element={<AdminRoutes />} />
      
      <Route path="/company/*" element={<CompanyRoutes />} />

      </Routes>
    </div>
  );
}

export default App;
