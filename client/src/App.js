import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RankResume from "./pages/RankResume";
import AuthModal from "./components/AuthModal";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [authType, setAuthType] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <BrowserRouter>
      <Navbar
        openAuth={setAuthType}
        user={user}
        logout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rank-resume" element={<RankResume />} />
      </Routes>

      {authType && (
        <AuthModal
          type={authType}
          close={() => setAuthType(null)}
        />
      )}
    </BrowserRouter>
  );
}

export default App;