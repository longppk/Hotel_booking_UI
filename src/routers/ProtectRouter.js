import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('role');
  
  return role === userRole ? children : <Navigate to="/authenticate" />;
};
