import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

function DashboardPharmacy() {
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
    );
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pharmacyTasks = [
    { label: 'View Prescriptions', icon: '📋' },
    { label: 'Dispense Medicines', icon: '💊' },
    { label: 'Inventory Management', icon: '📦' },
    { label: 'Order Stock', icon: '🛒' },
    { label: 'Expired Items', icon: '⏳' },
    { label: 'Notify OT / Doctor', icon: '📨' },
  ];

  const formatTime = (t) =>
    t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      ref={panelRef}
      className="h-screen bg-gradient-to-br from-emerald-100 to-green-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-emerald-800 text-white flex justify-between items-center px-6 py-3">
        <h1 className="text-lg font-bold">CloudCure 🏥 Pharmacy</h1>
        <div className="flex gap-4 items-center">
          <p>Pharmacy Department</p>
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
        {pharmacyTasks.map((task, idx) => (
          <div
            key={idx}
            onClick={() => setActivePanel(task)}
            className="bg-white hover:bg-emerald-100 transition p-4 rounded-xl shadow flex flex-col items-center justify-center text-center cursor-pointer transform hover:scale-105 duration-200"
          >
            <div className="text-4xl mb-2">{task.icon}</div>
            <h2 className="font-semibold text-emerald-800">{task.label}</h2>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-emerald-900 text-white text-sm px-6 py-2 flex justify-between">
        <span>CloudCure OS - Pharmacy Panel</span>
        <span>{time.toLocaleTimeString()}</span>
      </div>

      {/* Modal */}
      {activePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-emerald-800">
                {activePanel.icon} {activePanel.label}
              </h3>
              <button
                onClick={() => setActivePanel(null)}
                className="text-red-500 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            <div className="text-gray-700 text-sm">
              <p>
                This is a placeholder modal for <strong>{activePanel.label}</strong>. You can
                integrate medicine data, form inputs, alerts, and live stock data from Supabase or any backend here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPharmacy;
