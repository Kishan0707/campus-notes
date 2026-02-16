import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside className="w-64 min-h-screen text-white bg-blue-700 fixed ">
        <div className="p-4 text-2xl font-bold border-b border-blue-500">
          Campus Notes
        </div>
        <nav className="flex mt-6 flex-col gap-2 px-4">
          <Link to="/dashboard" className="hover:bg-blue-600 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/notes" className="hover:bg-blue-600 p-2 rounded">
            Notes
          </Link>
          <Link to="/bookmarks" className="hover:bg-blue-600 p-2 rounded">
            Bookmarks
          </Link>
          <Link to="/profile" className="hover:bg-blue-600 p-2 rounded">
            Profile
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
