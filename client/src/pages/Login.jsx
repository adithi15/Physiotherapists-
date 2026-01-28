import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.user, res.data.token);
            if (res.data.user.role === 'patient') navigate('/user-dashboard');
            else navigate('/pt-dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || "Login failed");
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200 border border-gray-100 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to manage your appointments</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <input type="email" placeholder="name@company.com" className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div>
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <input type="password" placeholder="••••••••" className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                        Sign In
                    </button>
                </form>
                
                <p className="mt-8 text-center text-gray-500 text-sm">
                    New to PhysioConnect? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;