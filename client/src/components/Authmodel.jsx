import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
function AuthModal({ type, close }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">

        <h2 className="text-xl font-bold mb-4 text-center">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 border mb-3 rounded"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-2 border mb-4 rounded"
        />

        {/* Button */}
        <button className="w-full bg-blue-500 text-white p-2 rounded mb-3 hover:bg-blue-600">
          {type === "login" ? "Login" : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="text-center mb-3 text-gray-500">OR</div>

        {/* Google */}
        <button className="w-full border p-2 rounded hover:bg-gray-100">
          Continue with Google
        </button>

        {/* Close */}
        <button
          onClick={close}
          className="mt-4 text-red-500 text-sm block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AuthModal;