import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Session = ({ apiKey, sessionToken, onLogout }) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function validateSession() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${sessionToken}`
        );

        if (response.data.success) {
          setIsValid(true);
        } else {
          setIsValid(false);
          console.error('Session validation failed');
        }
      } catch (error) {
        console.error('Session validation error:', error);
      }
    }

    if (sessionToken) {
      validateSession();
    }
  }, [apiKey, sessionToken]);

  const handleLogout = async () => {
    try {
      await axios.delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`
      );
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isValid) {
    return (
      <div>
        <p>Session is valid.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return <p>Session is not valid.</p>;
  }
};

export default Session;
