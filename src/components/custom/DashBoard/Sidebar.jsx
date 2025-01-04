import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../userContex';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

const Sidebar = () => {
  const { user, setUser } = useUser(); 
  const [isQuizZoneOpen, setQuizZoneOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem('loginTime'); 
    navigate('/login'); 
  };

  return (
    <div className="w-72 h-screen bg-gray-800 text-white font-medium p-4 flex flex-col shadow-lg">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-200">{user ? user.name : 'Guest'}</h3>
        <p className="text-sm italic text-gray-400">{user ? user.userType : 'No User'}</p>
      </div>
      <nav className="rounded-sm">
        <ul className="space-y-1">
          <li>
            <Link
              to="/dashboard"
              className="block py-2 px-4 transition hover:bg-gray-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <div>
              <button
                onClick={() => setQuizZoneOpen(!isQuizZoneOpen)}
                className="w-full text-left flex items-center justify-between py-2 px-4 transition hover:bg-gray-600"
              >
                <span>Quiz Zone</span>
                {isQuizZoneOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isQuizZoneOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <Link
                      to="/add-manually"
                      className="block py-2 px-4 transition hover:bg-gray-500"
                    >
                      Add Questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-csv"
                      className="block py-2 px-4 transition hover:bg-gray-500"
                    >
                      Add Bulk Questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/view-questions"
                      className="block py-2 px-4 transition hover:bg-gray-500"
                    >
                      Search, View, and Edit Questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/AIGeneratedQuestions"
                      className="block py-2 px-4 transition hover:bg-gray-500"
                    >
                      Generate AI Questions
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          {/* Logout Link */}
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 transition hover:bg-gray-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
