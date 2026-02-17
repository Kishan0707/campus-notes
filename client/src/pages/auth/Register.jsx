import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL, "API url");

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password } = form;
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters ");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Register Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-8 rounded-lg shadow bg-gray-100">
        <form
          className="bg-white w-full max-w-md p-8 rounded-lg shadow"
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-500">Join Campus Notes</p>
          {error && (
            <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}
          <input
            type="text"
            onChange={handleChange}
            value={form.name}
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-500 px-2 p-2 rounded mb-4"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-500 px-2 p-2 rounded mb-4"
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            className="p-2 w-full rounded border border-gray-500 px-2 mb-4"
          />
          <button
            className="w-full bg-green-600 text-white hover:bg-green-700 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
          <p className="text-center text-sm text-gray-600 font-medium">
            Already have an account ?&nbsp;
            <Link to="/" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
