import { createContext, useContext, useState } from 'react';
import { loginUser } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      await loginUser(email, password);
      setIsAuthenticated(true);
      setAuthError(null);
      navigate('/products');
    } catch (err) {
        console.log(err)
      setAuthError('Invalid email or password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, authError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
