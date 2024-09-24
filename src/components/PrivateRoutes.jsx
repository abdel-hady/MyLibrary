import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for the token

  // If the user is not authenticated, redirect to the login page
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
