import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LISTINGS } from "../Routes/Routes";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const userName = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const enteredUserName = userName.current.value;
    const enteredPassword = password.current.value;

    if (!enteredUserName || !enteredPassword) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: enteredUserName,
        password: enteredPassword,
      });

      const { token } = response.data;

      const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes from now

      localStorage.setItem("authToken", token);
      localStorage.setItem("tokenExpiration", expirationTime);

      navigate(LISTINGS);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  const handleReset = () => {
    userName.current.value = "";
    password.current.value = "";
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-md border border-red-300">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700">
            User Name
          </label>
          <input
            id="userName"
            type="text"
            name="userName"
            ref={userName}
            onChange={() => setError("")}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            ref={password}
            onChange={() => setError("")}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            className="text-sm text-red-500 hover:underline focus:outline-none"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
