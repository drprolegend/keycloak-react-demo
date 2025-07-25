# React Keycloak Integration Demo

Questa applicazione dimostra l'integrazione di Keycloak con React per l'autenticazione degli utenti.

## Configurazione

1. Crea un file `.env` nella root del progetto con le seguenti variabili:

```
REACT_APP_KEYCLOAK_URL=https://your-keycloak-url
REACT_APP_KEYCLOAK_REALM=your-realm
REACT_APP_KEYCLOAK_CLIENT_ID=your-client-id
```

2. Configura il client in Keycloak:
   - Access Type: `public`
   - Standard Flow Enabled: `ON`
   - Valid Redirect URIs: `http://localhost:3000/*`
   - Web Origins: `http://localhost:3000`

## Installazione

```bash
npm install
```

## Avvio in Development

```bash
npm start
```

## Build per Production

```bash
npm run build
```

## Funzionalità

- Login utente tramite Keycloak
- Visualizzazione informazioni utente
- Visualizzazione token JWT
- Gestione automatica refresh token
- Logout

## Note di Sicurezza

- L'applicazione usa PKCE per la sicurezza
- Non sono presenti secret nel codice
- Il logging è abilitato solo in development
- I token sono gestiti in modo sicuro da Keycloak

## Struttura del Progetto

- `src/config.js` - Configurazione dell'applicazione
- `src/keycloak.js` - Configurazione e inizializzazione Keycloak
- `src/hooks/useKeycloak.js` - Hook React per la gestione dell'autenticazione
- `src/App.js` - Componente principale con UI

## Requisiti

- Node.js >= 14
- npm >= 6
- Un'istanza Keycloak configurata
