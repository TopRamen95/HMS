import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

function DashboardRegistration() {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState('new');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
    );
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (t) => t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const renderForm = () => {
    switch (activeTab) {
      case 'new':
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Patient Name" className="input-style" />
            <input type="number" placeholder="Age" className="input-style" />
            <select className="input-style">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input type="text" placeholder="Symptoms" className="input-style" />
            <select className="input-style">
              <option>Select Department</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
              <option>Pharmacy</option>
              <option>OT</option>
            </select>
            <select className="input-style">
              <option>Visit Type</option>
              <option>OPD</option>
              <option>IPD</option>
            </select>
            <button className="btn-primary">Register</button>
          </div>
        );
      case 'returning':
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Search by Patient ID or Name" className="input-style" />
            <button className="btn-primary">Fetch Records</button>
            <button className="btn-secondary">Update Details</button>
          </div>
        );
      case 'emergency':
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Referral ID or Case Note" className="input-style" />
            <textarea placeholder="Emergency Description" className="input-style" />
            <button className="btn-primary bg-red-600 hover:bg-red-700">Fast Register</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={panelRef}
      className="h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col"
    >
      {/* Top Navbar */}
      <div className="bg-blue-800 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">CloudCure 🏥 Registration Desk</h1>
        <div className="flex items-center gap-4">
          <p>{formatTime(time)}</p>
          <button onClick={() => navigate('/')} className="bg-red-500 px-3 py-1 rounded text-sm">
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 bg-white shadow py-4">
        {['new', 'returning', 'emergency'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab === 'new' ? 'New Patient' : tab === 'returning' ? 'Returning' : 'Emergency'}
          </button>
        ))}
      </div>

      {/* Main Form Area */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">{renderForm()}</div>
      </div>

      {/* Footer */}
      <div className="bg-blue-900 text-white text-sm text-center py-2">
        CloudCure OS — Registration Panel | {time.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default DashboardRegistration;
