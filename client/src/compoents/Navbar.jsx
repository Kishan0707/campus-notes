import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("campusUser"));
  const handleLogout = () => {
    localStorage.removeItem("campusUser");
    navigate("/");
  };
  return (
    <>
      <header className="h-16 bg-white shadow flex items-center justify-between px-6 ml-64">
        <h1 className="font-semibold text-xl ">Campus Notes</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-xl">{user?.name}</span>
          <div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
