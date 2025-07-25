import { useState, useEffect } from 'react';
import { keycloak, initKeycloak } from '../keycloak';

export const useKeycloak = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await initKeycloak();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          // Carica il profilo utente se autenticato
          const profile = await keycloak.loadUserProfile();
          setUserProfile(profile);

          // Setup refresh token per l'utente
          setInterval(() => {
            keycloak.updateToken(70).catch(() => {
              console.log('Failed to refresh token');
            });
          }, 60000);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      clearInterval();
    };
  }, []);

  const login = () => {
    keycloak.login({
      redirectUri: window.location.origin
    });
  };

  const logout = () => {
    keycloak.logout({
      redirectUri: window.location.origin
    });
  };

  return {
    isLoading,
    isAuthenticated,
    userProfile,
    error,
    login,
    logout,
    keycloak
  };
}; 