import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Activity, Calendar, MapPin, Clock } from 'lucide-react';


const UserDashboard = () => {
    const [physios, setPhysios] = useState([]);
    const [selectedPhysio, setSelectedPhysio] = useState(null);
    const { user } = useContext(AuthContext);

    const slots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

    useEffect(() => {
        const fetchPhysios = async () => {
            const res = await axios.get('http://localhost:5000/api/auth/physiotherapists');
            setPhysios(res.data);
        };
        fetchPhysios();
    }, []);

    const handleBook = async (time) => {
    // console.log("User from Context:", user); // Check if user.id exists
    try {
        const bookingData = {
            patientId: user.id || user._id, // Try both just in case
            physioId: selectedPhysio._id, 
            date: new Date().toISOString().split('T')[0],
            timeSlot: time,
            amountPaid: selectedPhysio.fees
        };
        const res = await axios.post('http://localhost:5000/api/appointments/book', bookingData);
        alert(res.data.msg);
        setSelectedPhysio(null);
    } catch (err) {
        console.error("Booking failed", err);
    }
};
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Find a Specialist</h1>
                <p className="text-gray-500">Choose a physiotherapist to view available slots for today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {physios.map((pt) => (
                    <div key={pt._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Activity className="text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{pt.name}</h3>
                        <p className="text-blue-600 text-sm font-semibold mb-4 uppercase tracking-wider">{pt.specialization}</p>
                        
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center text-gray-500 text-sm gap-2">
                                <MapPin size={16} /> {pt.clinicAddress}
                            </div>
                            <div className="flex items-center text-gray-900 font-bold gap-2">
                                ₹{pt.fees} <span className="text-gray-400 font-normal text-xs">/ session</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSelectedPhysio(pt)}
                            className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
                        >
                            Select Slot
                        </button>
                    </div>
                ))}
            </div>

            {selectedPhysio && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-2">Dr. {selectedPhysio.name}</h2>
                        <p className="text-gray-500 mb-6 flex items-center gap-2"><Clock size={16}/> Pick a time for today</p>
                        <div className="grid grid-cols-2 gap-3">
                            {slots.map(slot => (
                                <button key={slot} onClick={() => handleBook(slot)} className="border-2 border-gray-100 p-3 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 transition">
                                    {slot}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setSelectedPhysio(null)} className="mt-8 w-full py-2 text-gray-400 font-medium">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;