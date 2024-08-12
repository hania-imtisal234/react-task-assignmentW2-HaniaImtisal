import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Star Wars App</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
