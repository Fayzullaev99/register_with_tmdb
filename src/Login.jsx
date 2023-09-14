import React, { useEffect, useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [requestToken, setRequestToken] = useState('');
    const [guestSession, setGuestSession] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tokenResponse, guestSessionResponse] = await Promise.all([
                    fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=6631170ac0507794a62b3c544415862a'),
                    fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=6631170ac0507794a62b3c544415862a')
                ]);
                const tokenData = await tokenResponse.json();
                const guestSessionData = await guestSessionResponse.json();
                setRequestToken(tokenData.request_token);
                setGuestSession(guestSessionData.guest_session_id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [])
    console.log(requestToken);
    console.log(guestSession);
    const handleLogin = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=6631170ac0507794a62b3c544415862a`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer 6631170ac0507794a62b3c544415862a'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    request_token: requestToken,
                })
            })

            if (response.ok) {
                const data = await response.json();
                onLogin(data.request_token);
                console.log(data);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
