import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

function DashboardAdmin() {
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, panelRef);

    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const formatTime = (t) =>
    t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const adminTasks = [
    { label: 'Manage Doctors', icon: '🩺', id: 'doctors' },
    { label: 'Manage Patients', icon: '🧑‍🤝‍🧑', id: 'patients' },
    { label: 'Manage Staff', icon: '👷‍♂️', id: 'staff' },
    { label: 'OT Schedule', icon: '📅', id: 'ot' },
    { label: 'Pharmacy Inventory', icon: '💊', id: 'pharmacy' },
    { label: 'Alerts', icon: '🚨', id: 'alerts' },
    { label: 'Registration Desk', icon: '📝', id: 'registration' },
    { label: 'Analytics & Logs', icon: '📊', id: 'analytics' },
  ];

  return (
    <div
      ref={panelRef}
      className="h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col"
    >
      {/* Top Bar */}
      <div className="bg-indigo-700 text-white flex justify-between items-center px-6 py-3 shadow">
        <h1 className="font-bold text-lg">CloudCure 🏥 Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="font-medium">Administrator</p>
          <p>{formatTime(time)}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Grid Tasks */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {adminTasks.map((task, index) => (
          <div
            key={index}
            onClick={() => setActiveTask(task)}
            className="bg-white hover:bg-indigo-100 transition p-4 rounded-xl shadow flex flex-col items-center justify-center text-center cursor-pointer transform hover:scale-105 duration-300"
          >
            <div className="text-4xl mb-2">{task.icon}</div>
            <h2 className="font-semibold text-indigo-700">{task.label}</h2>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-indigo-800 text-white text-sm px-6 py-2 flex justify-between">
        <span>CloudCure OS - Admin Panel</span>
        <span>{time.toLocaleTimeString()}</span>
      </div>

      {/* Modal */}
      {activeTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full scale-95 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-indigo-700">
                {activeTask.icon} {activeTask.label}
              </h3>
              <button
                onClick={() => setActiveTask(null)}
                className="text-red-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            <div className="text-gray-700 text-sm space-y-2">
              <p>
                Placeholder for <strong>{activeTask.label}</strong> section.
              </p>
              <p className="italic text-indigo-500">
                This will be connected to Firebase for live data sync.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardAdmin;
