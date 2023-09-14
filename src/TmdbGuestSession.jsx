import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TmdbGuestSession = ({ apiKey }) => {
  const [guestSessionId, setGuestSessionId] = useState('');

  useEffect(() => {
    const createGuestSession = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
        );
        setGuestSessionId(response.data.guest_session_id);
      } catch (error) {
        console.error('Error creating guest session:', error);
      }
    };
    createGuestSession();
  }, [apiKey]);
  console.log(guestSessionId);
  return (
    <div>
      <h2>Guest Session ID: {guestSessionId}</h2>
    </div>
  );
};

export default TmdbGuestSession;
