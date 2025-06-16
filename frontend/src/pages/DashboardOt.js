import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

function DashboardOT() {
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, { y: -30, opacity: 0, duration: 1.2, ease: 'power3.out' });
    }, panelRef);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const formatTime = (t) =>
    t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const otTasks = [
    { label: 'Surgery Schedule', icon: '📅' },
    { label: 'Pre-Op Checklist', icon: '✅' },
    { label: 'Request Pharmacy', icon: '💊' },
    { label: 'Assign Staff', icon: '👥' },
    { label: 'Patient Updates', icon: '📁' },
    { label: 'Live OT Status', icon: '🔄' },
    { label: 'Post-Op Reports', icon: '📝' },
    { label: 'OT Analytics', icon: '📊' },
  ];

  return (
    <div
      ref={panelRef}
      className="h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col"
    >
      {/* Top Nav */}
      <div className="bg-blue-700 text-white flex justify-between items-center px-6 py-3">
        <h1 className="font-bold text-lg">CloudCure 🏥 Operation Theatre</h1>
        <div className="flex items-center gap-4">
          <p>OT Department</p>
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
        {otTasks.map((task, index) => (
          <div
            key={index}
            onClick={() => setActiveTask(task)}
            className="bg-white hover:bg-blue-100 transition p-4 rounded-xl shadow flex flex-col items-center justify-center text-center cursor-pointer transform hover:scale-105 duration-200"
          >
            <div className="text-4xl mb-2">{task.icon}</div>
            <h2 className="font-semibold text-blue-700">{task.label}</h2>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-blue-800 text-white text-sm px-6 py-2 flex justify-between">
        <span>CloudCure OS - OT Panel</span>
        <span>{time.toLocaleTimeString()}</span>
      </div>

      {/* Modal */}
      {activeTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-700">
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
                This is a placeholder modal for <strong>{activeTask.label}</strong>. You can
                integrate Supabase actions, input forms, and live updates here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardOT;
