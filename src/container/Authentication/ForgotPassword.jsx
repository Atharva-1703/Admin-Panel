import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../components/custom/Auth/Firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setError('');
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 text-gray-800 p-6">
      <form
        onSubmit={handleResetPassword}
        className="bg-gray-100 p-8 rounded-lg w-full max-w-sm shadow-lg"
      >
        <h2 className="text-center text-gray-900 text-3xl font-bold mb-6 uppercase">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-blue-50 text-gray-800 shadow-md"
        />
        <button
          type="submit"
          className="w-full p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 shadow-md"
        >
          Reset Password
        </button>

        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
