import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ role: 'patient', name: '', email: '', password: '', contactNumber: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(res.data.message);
            navigate('/login');
        } catch (err) { alert(err.response?.data?.message || "Registration failed"); }
    };

    return (
        <div className="min-h-screen py-20 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Join PhysioConnect</h2>
                <p className="text-center text-gray-500 mb-8">Select your role to get started</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4 mb-6">
                        {['patient', 'physiotherapist'].map(role => (
                            <button key={role} type="button" onClick={() => setFormData({...formData, role})} className={`flex-1 py-3 rounded-xl font-bold capitalize transition ${formData.role === role ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                {role}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" required />
                        <input type="text" name="contactNumber" placeholder="Contact No." onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" required />
                    </div>

                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" required />

                    {formData.role === 'physiotherapist' && (
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <input type="text" name="specialization" placeholder="Specialization (e.g. Sports)" onChange={handleChange} className="w-full p-4 bg-blue-50 border border-blue-100 rounded-2xl outline-none" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="clinicAddress" placeholder="Clinic Address" onChange={handleChange} className="w-full p-4 bg-blue-50 border border-blue-100 rounded-2xl outline-none" />
                                <input type="number" name="fees" placeholder="Fees (₹)" onChange={handleChange} className="w-full p-4 bg-blue-50 border border-blue-100 rounded-2xl outline-none" />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition mt-6">
                        Create Account
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;