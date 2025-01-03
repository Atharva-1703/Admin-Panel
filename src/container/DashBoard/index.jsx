import React, { useEffect } from 'react';
import Sidebar from '../../components/custom/DashBoard/Sidebar';
import { useUser } from '../../userContex'; 
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, setUser } = useUser(); 
  const navigate = useNavigate();

  useEffect(() => {
    
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const sessionDuration = Date.now() - loginTime;
      if (sessionDuration > 3600000) {
        
        setUser(null); 
        localStorage.removeItem('loginTime'); 
        navigate('/login'); 
      }
    }
  }, [setUser, navigate]);


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-yellow-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 uppercase">Dashboard</h1>
        {user ? (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl text-gray-700">Welcome, {user.name}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">User Type: {user.userType}</p>

          </div>
        ) : (
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
