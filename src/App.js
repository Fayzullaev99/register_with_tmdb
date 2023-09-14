import React, { useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import Session from './Session';

const apiKey = '6631170ac0507794a62b3c544415862a';

function App() {
  const [sessionToken, setSessionToken] = useState(null);

  const handleLogin = (token) => {
    setSessionToken(token);
  };
  console.log(sessionToken);

  const handleLogout = () => {
    setSessionToken(null);
  };

  return (
    <div className="App">
      <h1>TMDb Authentication</h1>
      {sessionToken ? (
        <div>
          <Session apiKey={apiKey} sessionToken={sessionToken} onLogout={handleLogout} />
        </div>
      ) : (
        <Login apiKey={apiKey} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

