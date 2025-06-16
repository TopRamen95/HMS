import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, updateDoc, doc, addDoc } from 'firebase/firestore';
import db from '../utils/firebase';
import { motion } from 'framer-motion';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'alerts'), (snapshot) => {
      setAlerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!type || !location) return alert('Fill all fields');
    await addDoc(collection(db, 'alerts'), { type, location, status: 'Active' });
    setType('');
    setLocation('');
  };

  const markResolved = async (id) => {
    await updateDoc(doc(db, 'alerts', id), { status: 'Resolved' });
  };

  const sectionStyle = {
    backgroundColor: '#f9fafb',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 style={{ fontSize: '2rem', color: '#1e3a8a', marginBottom: '20px' }}>🚨 Emergency Alerts</h1>

        {/* Form Section */}
        <div style={sectionStyle}>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Alert Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                flexGrow: 1,
                minWidth: '200px'
              }}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                flexGrow: 1,
                minWidth: '200px'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Raise Alert
            </button>
          </form>
        </div>

        {/* Alert List Section */}
        <div style={sectionStyle}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '16px' }}>Current Alerts:</h3>
          {alerts.length === 0 ? (
            <p style={{ color: '#6b7280' }}>No active alerts at the moment.</p>
          ) : (
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {alerts.map(item => (
                <li key={item.id} style={{
                  marginBottom: '12px',
                  padding: '10px 15px',
                  backgroundColor: item.status === 'Resolved' ? '#f0fdf4' : '#fef2f2',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>{item.type}</strong> @ {item.location} —
                    <span style={{ marginLeft: '10px', color: item.status === 'Resolved' ? '#16a34a' : '#dc2626' }}>
                      {item.status}
                    </span>
                  </div>
                  {item.status !== 'Resolved' && (
                    <button
                      onClick={() => markResolved(item.id)}
                      style={{
                        backgroundColor: '#16a34a',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Mark Resolved
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}
