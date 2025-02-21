import React, { useState ,useContext } from 'react';
import axios from 'axios';
import { Context } from '../../App';
import Api from '../../AxiosInstance';
import LoginForm from '../../components/post_forms/loginForm';
import LoginContainer from '../../components/containers/loginContainer';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    if(localStorage.getItem("access_token")){
        document.location.href = '/';
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });

            // Store tokens in local storage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem("active", "true");
            // Redirect or perform any other actions after successful login
            document.location.href = '/'; // Redirect to home or dashboard
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials');
        }
    };

    return (
        <LoginContainer>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          error={error}
        />
      </LoginContainer>
    );
};

export default Login;
