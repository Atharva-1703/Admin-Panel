import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../components/custom/Auth/Firebase'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('student'); // Default to 'student'
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        userType,
        createdAt: new Date(),
      });

      alert('Signup successful');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 text-gray-800 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-8 rounded-lg w-full max-w-sm shadow-2xl"
      >
        <h2 className="text-center text-gray-900 text-3xl font-bold mb-6">Signup</h2>
        
        {/* User Type Buttons */}
        <div className="mb-4 flex justify-center gap-4 bg-gray-600 p-1 rounded-full relative w-2/3 mx-auto">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-yellow-300 rounded-full transition-all duration-300 ease-in-out ${userType === 'instructor' ? 'translate-x-full' : ''}`}
          ></div>
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`w-1/2 px-3 py-1 rounded-full ${userType === 'student' ? 'bg-yellow-500' : 'bg-gray-300'} text-gray-800 shadow-lg shadow-black z-10`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType('instructor')}
            className={`w-1/2 px-3 py-1 rounded-full ${userType === 'instructor' ? 'bg-yellow-500' : 'bg-gray-300'} text-gray-800 shadow-lg shadow-black z-10`}
          >
            Instructor
          </button>
        </div>

        {/* Input fields */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-100 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-100 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-100 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-100 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-100 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          type="submit"
          className="w-full p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 shadow-md transition-all"
        >
          Signup
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
