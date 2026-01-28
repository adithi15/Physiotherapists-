import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <Activity className="text-blue-600 w-8 h-8" />
                        <span className="text-xl font-bold text-gray-800 tracking-tight">Physio<span className="text-blue-600">Connect</span></span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        {!user ? (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md shadow-blue-200">
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <>
                                <span className="text-gray-500 text-sm hidden sm:block">Welcome, <span className="font-semibold text-gray-700">{user.name}</span></span>
                                <Link to={user.role === 'patient' ? '/user-dashboard' : '/pt-dashboard'} className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                                <button 
                                    onClick={handleLogout}
                                    className="border border-red-200 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50 transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 