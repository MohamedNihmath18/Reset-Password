// src/components/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      console.log(response.data);
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
