import React, { createContext, useState } from 'react';
import Router from './routes/Routes';

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router />
    </UserContext.Provider>
  );
};

export default App;
