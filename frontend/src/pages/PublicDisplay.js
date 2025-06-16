import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PublicDisplay() {
  const [searchParams] = useSearchParams();
  const department = searchParams.get('department') || 'Cardiology';

  const [time, setTime] = useState(new Date());
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    setTime(new Date());

    // Mock fetching department-specific data
    const allQueue = [
      {
        uid: 'P013',
        token: 'C-10',
        doctor: 'Dr. Aryan Mehta',
        department: 'Cardiology',
        location: 'Room 102',
        status: 'Now Consulting',
      },
      {
        uid: 'P014',
        token: 'C-11',
        doctor: 'Dr. Aryan Mehta',
        department: 'Cardiology',
        location: 'Room 102',
        status: 'In Queue',
      },
      {
        uid: 'P021',
        token: 'N-1',
        doctor: 'Dr. Sanya Kapoor',
        department: 'Neurology',
        location: 'Room 201',
        status: 'Now Consulting',
      },
    ];

    const filteredQueue = allQueue.filter((entry) => entry.department === department);
    setQueue(filteredQueue);

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [department]);

  const current = queue.find((p) => p.status === 'Now Consulting');
  const upcoming = queue.filter((p) => p.status !== 'Now Consulting');

  const formatTime = (t) =>
    t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="h-screen bg-gradient-to-br from-zinc-900 to-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-zinc-800 p-5 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-400">
          🏥 CloudCure - {department} Display
        </h1>
        <div className="text-md md:text-xl text-gray-300">{formatTime(time)}</div>
      </div>

      {/* Current Token */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl text-yellow-400 font-bold mb-4">Now Consulting</h2>
        {current ? (
          <div className="bg-green-700 px-10 py-6 rounded-xl w-full max-w-3xl">
            <h3 className="text-5xl font-bold text-white mb-2">{current.token}</h3>
            <p className="text-lg">UID: <span className="font-semibold">{current.uid}</span></p>
            <p className="text-lg">Doctor: <span className="font-semibold">{current.doctor}</span></p>
            <p className="text-lg">Room: <span className="font-semibold">{current.location}</span></p>
          </div>
        ) : (
          <p className="text-gray-400 text-xl">No patient currently consulting</p>
        )}
      </div>

      {/* Queue Table */}
      <div className="bg-zinc-800 py-5 px-6">
        <h3 className="text-xl text-teal-300 mb-2">Upcoming Tokens - {department}</h3>
        <div className="overflow-auto">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="text-gray-400 border-b border-gray-600">
              <tr>
                <th className="py-2">Token</th>
                <th className="py-2">UID</th>
                <th className="py-2">Doctor</th>
                <th className="py-2">Room</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No upcoming tokens</td>
                </tr>
              ) : (
                upcoming.map((entry, i) => (
                  <tr key={i} className="text-white border-b border-gray-700 hover:bg-zinc-700 transition">
                    <td className="py-2">{entry.token}</td>
                    <td className="py-2">{entry.uid}</td>
                    <td className="py-2">{entry.doctor}</td>
                    <td className="py-2">{entry.location}</td>
                    <td className="py-2 text-green-400">{entry.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-teal-700 py-3 text-white text-center text-sm md:text-base font-medium">
        Please wait for your token to be displayed. Stay safe – Team CloudCure 🏥
      </div>
    </div>
  );
}

export default PublicDisplay;
