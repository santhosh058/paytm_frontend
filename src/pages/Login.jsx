// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      const { token } = res.data.data;
      alert(token)
      
      localStorage.setItem('token', token); // Store token
      
      alert('Login successful!');
      navigate('/dashboard'); // Navigate to dashboard
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="form-control w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="form-control w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-full mt-4 py-2 font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
