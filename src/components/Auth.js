import React, { useState } from 'react';
import { auth } from '../services/firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Auth;
