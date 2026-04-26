import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthModal from "./components/AuthModal";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [authType, setAuthType] = useState(null);
  const [user, setUser] = useState(null);

  // 🔹 Track logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <Navbar openAuth={setAuthType} user={user} logout={handleLogout} />
      
      <Home />

      {authType && (
        <AuthModal
          type={authType}
          close={() => setAuthType(null)}
        />
      )}
    </>
  );
}

export default App;