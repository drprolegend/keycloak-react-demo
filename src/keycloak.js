import Keycloak from 'keycloak-js';
import config from './config';

const keycloak = new Keycloak({
    url: config.keycloak.url,
    realm: config.keycloak.realm,
    clientId: config.keycloak.clientId
});

// Initialize Keycloak
const initKeycloak = () => {
    return keycloak.init({
        pkceMethod: 'S256',                    // Usa PKCE per sicurezza
        checkLoginIframe: false,               // Disabilita il check dell'iframe
        onLoad: 'check-sso',                   // Controlla se l'utente è già loggato
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        enableLogging: process.env.NODE_ENV === 'development'  // Logging solo in development
    });
};

export { keycloak, initKeycloak }; 