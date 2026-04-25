// components/ProtectedRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />; // Not logged in
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />; // Role mismatch
  if(!allow)
  return children;


}
