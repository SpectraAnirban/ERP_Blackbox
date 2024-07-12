import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../config';





const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [verificationStatus, setVerificationStatus] = useState(JSON.parse(localStorage.getItem('verificationStatus')));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(`${config.apiBASEURL}/auth/status`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const { isAuthenticated, role, userId, verificationStatus } = response.data;
          setIsAuthenticated(isAuthenticated);
          setRole(role);
          setUserId(userId);
          setVerificationStatus(verificationStatus);
          setLoading(false);

          // Store the tokens and user details in local storage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('userId', userId);
          localStorage.setItem('verificationStatus', JSON.stringify(verificationStatus));
        } catch (error) {
          console.error('Error checking authentication status:', error);
          setIsAuthenticated(false);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [accessToken]);

  const login = (authData) => {
    setIsAuthenticated(true);
    setRole(authData.role);
    setAccessToken(authData.accessToken);
    setRefreshToken(authData.refreshToken);
    setUserId(authData.userId);
    setVerificationStatus(authData.verificationStatus);

    // Store the tokens and user details in local storage
    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('refreshToken', authData.refreshToken);
    localStorage.setItem('userId', authData.userId);
    localStorage.setItem('verificationStatus', JSON.stringify(authData.verificationStatus));
    localStorage.setItem('role', authData.role);
  };

  const logout = async () => {
    try {
      await axios.post(`${config.apiBASEURL}/auth/logout`);
    } catch (error) {
      console.error('Error logging out:', error);
    }
    setIsAuthenticated(false);
    setRole(null);
    setAccessToken(null);
    setRefreshToken(null);
    setUserId(null);
    setVerificationStatus(false);

    // Remove tokens and user details from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('verificationStatus');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, accessToken, refreshToken, userId, verificationStatus, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
