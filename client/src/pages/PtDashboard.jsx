import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Clock, User, Phone, CheckCircle } from 'lucide-react';

const PtDashboard = () => {
    const [myAppointments, setMyAppointments] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMyAppts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/appointments/physio/${user.id}`);
                setMyAppointments(res.data);
            } catch (err) {
                console.error("Error fetching appointments");
            }
        };
        if (user) fetchMyAppts();
    }, [user]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Physician Portal</h1>
                    <p className="text-gray-500">Manage your daily schedule and patient appointments.</p>
                </div>
                <div className="text-right">
                    <span className="text-sm text-gray-400">Status</span>
                    <p className="text-green-600 font-bold flex items-center gap-1 justify-end">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <Clock size={18} className="text-blue-600" /> Today's Schedule
                </h2>

                {myAppointments.length > 0 ? myAppointments.map((appt) => (
                    <div key={appt._id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:border-blue-200 transition">
                        <div className="flex items-center gap-6">
                            <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-center">
                                <p className="text-xs uppercase font-bold tracking-tighter">Time</p>
                                <p className="text-lg font-black">{appt.timeSlot}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <User size={18} className="text-gray-400" /> {appt.patientId?.name}
                                </h3>
                                <div className="flex gap-4 mt-1">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Phone size={14} /> {appt.patientId?.contactNumber}
                                    </p>
                                    <p className="text-sm text-gray-500">Age: {appt.patientId?.age}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex items-center gap-4">
                            <div className="text-right mr-4">
                                <p className="text-xs text-gray-400 font-bold uppercase">Payment</p>
                                <p className="text-gray-900 font-bold">₹{appt.amountPaid}</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1">
                                <CheckCircle size={14} /> CONFIRMED
                            </span>
                        </div>
                    </div>
                )) : (
                    <div className="bg-white border-2 border-dashed border-gray-200 p-20 rounded-3xl text-center">
                        <p className="text-gray-400 font-medium">No appointments booked for today yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PtDashboard;