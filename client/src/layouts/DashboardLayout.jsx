// import { Analytics } from "@vercel/analytics/next";
import Navbar from "../compoents/Navbar";
import Sidebar from "../compoents/Sidebar";
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ">
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="p-6 ml-64">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
