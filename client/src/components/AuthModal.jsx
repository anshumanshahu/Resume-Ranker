import React, { useState } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

function AuthModal({ type, close }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(type);
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  // 🔹 Save user to MongoDB
  const saveUserToDB = async (name, email) => {
    try {
      await fetch("http://localhost:5000/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      });
    } catch (err) {
      console.log("Mongo save error:", err);
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);

      await saveUserToDB(
        result.user.displayName || "User",
        result.user.email
      );

      close();
    } catch (error) {
      console.log(error);
      alert("Google login failed");
    }
    setLoading(false);
  };

  // 🔹 Signup
  const handleSignup = async () => {
    setLoading(true);
    try {
      const userData = await createUserWithEmailAndPassword(auth, email, password);

      await saveUserToDB(
        userData.user.email,
        userData.user.email
      );

      close();
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
    setLoading(false);
  };

  // 🔹 Login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);

      await saveUserToDB(
        userData.user.email,
        userData.user.email
      );

      close();
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">

        <h2 className="text-xl font-semibold mb-4 text-center">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Main Button */}
        <button
          onClick={mode === "login" ? handleLogin : handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="text-center my-3 text-gray-400 text-sm">or</div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border p-2 rounded hover:bg-gray-100 transition disabled:opacity-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-sm text-center mt-4 text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Create one
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>

        {/* Close */}
        <button
          onClick={close}
          className="mt-4 text-sm text-gray-500 block mx-auto hover:text-red-500"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default AuthModal;