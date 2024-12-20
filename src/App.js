import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { Auth } from './components/auth';
import { Restaurant } from './components/restaurant';

function App() {
  const [user, setUser] = useState(null); // Track user authentication state
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Update user state on auth state change
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clear user state on logout
    } catch (err) {
      console.error("Log Out Error:", err);
    }
  };

  return (
    <div className="App">
      {user ? (
        // Render Restaurant component if user is logged in
        <Restaurant user={user} logout={logout} />
      ) : (
        // Render Auth component if user is not logged in
        <Auth setUser={setUser} />
      )}
    </div>
  );
}

export default App;
