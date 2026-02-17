import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
// import Sidebar from "../compoents/Sidebar";
// import Navbar from "../compoents/Navbar";
// import DashboardLayout from "../layouts/DashboardLayout";
import Notes from "../pages/Notes";
import ProtectedRoute from "./ProtectedRoute";
import Bookmarks from "../pages/bookmarks";
import UploadNote from "../pages/UploadNote";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadNote />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <UploadNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <div>Teacher Dashboard</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
