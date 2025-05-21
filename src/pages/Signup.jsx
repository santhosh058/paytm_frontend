// src/pages/Signup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Signup successful!');
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transition-all duration-300">
        <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="form-control w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="form-control w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 py-2 font-semibold transition hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
