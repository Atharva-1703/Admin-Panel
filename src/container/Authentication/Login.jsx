import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/custom/Auth/Firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 text-gray-800 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-8 rounded-lg w-full max-w-sm shadow-lg"
      >
        <h2 className="text-center text-gray-900 text-3xl font-bold mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-100 text-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-100 text-gray-800"
        />
        <button
          type="submit"
          className="w-full p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
        >
          Login
        </button>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
