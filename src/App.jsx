import { createContext, useState } from 'react';
import './App.css'
import Router from './routes/Routes'

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router />
    </UserContext.Provider>
  )
}

export default App
