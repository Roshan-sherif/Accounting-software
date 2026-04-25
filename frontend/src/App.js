import './App.css';
import ProtectedRoute from './components/ProtectRoute';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/login/login';
import AdminRoutes from './routes/AdminRoutes';
import CompanyRoutes from './routes/CompanyRoutes';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login/" element={<Login />} /> 

          <Route path="/admin/*" element ={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminRoutes />
            </ProtectedRoute>
          } />

          <Route path="/company/*" element={<CompanyRoutes />} />

        </Routes>

      </AuthProvider>
    </div>
  );
}

export default App;
