import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import PtDashboard from './pages/PtDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/pt-dashboard" element={<PtDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple Home component
const Hero = () => (
  <div className="max-w-7xl mx-auto px-4 py-20 text-center">
    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Expert Physiotherapy, <span className="text-blue-600">Just a Click Away.</span></h1>
    <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10">Book appointments with top-rated physiotherapists in your area. Secure payments, instant confirmations.</p>
    <div className="flex justify-center gap-4">
      <a href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700">Book Appointment</a>
    </div>
  </div>
);

export default App;