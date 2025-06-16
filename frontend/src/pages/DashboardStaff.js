import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

function DashboardStaff() {
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
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

  const staffTasks = [
    { label: 'Patient Check-In', icon: '🛎️' },
    { label: 'Manage Rooms', icon: '🛏️' },
    { label: 'Coordinate OT', icon: '🏥' },
    { label: 'Inventory & Stock', icon: '📦' },
    { label: 'Shift Schedule', icon: '📅' },
    { label: 'Transport Requests', icon: '🚑' },
    { label: 'Sanitation Reports', icon: '🧼' },
    { label: 'Helpdesk', icon: '📞' },
  ];

  return (
    <div
      ref={panelRef}
      className="h-screen bg-gradient-to-br from-green-100 to-blue-50 flex flex-col"
    >
      {/* Top Nav */}
      <div className="bg-green-700 text-white flex justify-between items-center px-6 py-3">
        <h1 className="font-bold text-lg">CloudCure 🏥 Staff Dashboard</h1>
        <div className="flex items-center gap-4">
          <p>Staff</p>
          <p>{formatTime(time)}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Task Grid */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {staffTasks.map((task, index) => (
          <div
            key={index}
            onClick={() => setActiveTask(task)}
            className="bg-white hover:bg-green-100 transition p-4 rounded-xl shadow flex flex-col items-center justify-center text-center cursor-pointer transform hover:scale-105 duration-200"
          >
            <div className="text-4xl mb-2">{task.icon}</div>
            <h2 className="font-semibold text-green-700">{task.label}</h2>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-green-800 text-white text-sm px-6 py-2 flex justify-between">
        <span>CloudCure OS - Staff Panel</span>
        <span>{time.toLocaleTimeString()}</span>
      </div>

      {/* Modal */}
      {activeTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-700">
                {activeTask.icon} {activeTask.label}
              </h3>
              <button
                onClick={() => setActiveTask(null)}
                className="text-red-500 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            <div className="text-gray-700 text-sm">
              <p>
                This is a placeholder modal for <strong>{activeTask.label}</strong>. 
                You can integrate live room status, duty updates, or requests here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardStaff;
