// src/components/RequestPasswordReset.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/request-password-reset', { email });
      console.log(response.data);
    } catch (error) {
      console.error('Error requesting password reset', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit">Request Password Reset</button>
    </form>
  );
};

export default RequestPasswordReset;
