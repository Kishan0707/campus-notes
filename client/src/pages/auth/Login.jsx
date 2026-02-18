import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
console.log("====================================");
console.log(API_URL);
console.log("====================================");

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("campusUser");
    const userData = JSON.parse(user);
    if (user) {
      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userData.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/dashboard");
      }
    }

    if (!user) navigate("/");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const user = res.data.user;
      localStorage.setItem("campusUser", JSON.stringify(user));
      if (user.role === "admin") {
        toast.success("Login Successfull");
        navigate("/admin/dashboard");
      } else if (user.role === "teacher") {
        toast.success("Login Successfull");
        navigate("/teacher/dashboard");
      } else {
        toast.success("Login Successfull");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Login Failed");
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 ">
        <form
          className="bg-white w-full max-w-md p-8 rounded-lg shadow hover:shadow-lg"
          onSubmit={handleForm}
        >
          <h2 className="text-2xl font-bold text-center mb-2">Campus Notes</h2>
          <p className="text-center font-bold text-2xl mb-6">
            Login to your account
          </p>
          {error && (
            <p className="bg-red-100 to-red-600 p-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="w-full p-2 border rounded mt-1"
              placeholder="you@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-sm text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border rounded mt-1"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-3 text-sm text-blue-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i class="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in... " : "Login"}
          </button>
          <p className="text-center text-sm mt-4">
            Don't have an Account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
