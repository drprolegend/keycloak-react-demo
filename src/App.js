import React, { useState } from 'react';
import { useKeycloak } from './hooks/useKeycloak';
import './App.css';

function App() {
  const { 
    isLoading, 
    isAuthenticated, 
    userProfile, 
    error,
    login, 
    logout,
    keycloak 
  } = useKeycloak();

  const [showToken, setShowToken] = useState(false);

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Caricamento...</h1>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Errore</h1>
          <p>{error}</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Keycloak Demo</h1>
        
        {isAuthenticated ? (
          <div>
            <p>Benvenuto, {userProfile?.firstName || 'Utente'}!</p>
            <p>Email: {userProfile?.email}</p>
            
            <div className="token-section">
              <button onClick={() => setShowToken(!showToken)}>
                {showToken ? 'Nascondi Token' : 'Mostra Token'}
              </button>
              
              {showToken && (
                <div className="token-display">
                  <h3>Access Token:</h3>
                  <textarea 
                    readOnly 
                    value={keycloak.token}
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      marginTop: '10px',
                      padding: '10px',
                      backgroundColor: '#2b2b2b',
                      color: '#fff',
                      border: '1px solid #666',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '12px'
                    }}
                  />
                  
                  <h3>Token Decodificato:</h3>
                  <pre 
                    style={{
                      textAlign: 'left',
                      backgroundColor: '#2b2b2b',
                      padding: '10px',
                      borderRadius: '4px',
                      maxWidth: '100%',
                      overflowX: 'auto',
                      fontSize: '12px'
                    }}
                  >
                    {JSON.stringify(keycloak.tokenParsed, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <button 
              onClick={logout}
              style={{ marginTop: '20px' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p>Effettua il login per accedere</p>
            <button onClick={login}>Login</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
