import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";

function App() {
  const [authType, setAuthType] = useState(null);

  return (
    <div>
      <Navbar openAuth={setAuthType} />

      <Home />

      {authType && (
        <AuthModal type={authType} close={() => setAuthType(null)} />
      )}
    </div>
  );
}

export default App;