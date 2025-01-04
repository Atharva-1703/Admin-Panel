import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/custom/Auth/Firebase';
import { useUser } from '../../userContex';

const Login = () => {
  const { setUser } = useUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      
      const userType = user.email ? 'Student' : 'Instructor';
      const userName = user.displayName || 'User';

      setUser({ email: user.email, name: userName, userType }); 

      
      localStorage.setItem('loginTime', Date.now());
      alert('Login successful');
      navigate('/dashboard'); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); 
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 text-gray-800 p-6">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-center text-gray-900 text-3xl font-bold mb-6 uppercase">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-blue-50 text-gray-800 shadow-sm shadow-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-blue-50 text-gray-800 shadow-sm shadow-black"
        />
        <button
          type="submit"
          className="w-full p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 shadow-sm shadow-black"
        >
          Login
        </button>
        <div className='flex flex-col justify-between items-center'>
        {/* Forgot Password Button */}
        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-fullbg-transparent text-yellow-600 hover:text-yellow-700 font-normal "
        >
          Forgot Password?
        </button>

        {/* Signup Button */}
        <button
          type="button"
          onClick={handleSignupRedirect}
          className="w-full bg-transparent text-yellow-600 hover:text-yellow-700 font-normal"
        >
          Don't have an account? Sign Up
        </button>
        </div>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
