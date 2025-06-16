import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc
} from 'firebase/firestore';
import db from '../utils/firebase';
import { motion } from 'framer-motion';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export default function OTSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00 PM');
  const [otNumber, setOtNumber] = useState('');

  const OT_LIST = ['OT1', 'OT2', 'OT3'];
  const occupiedOTs = schedule
    .filter(s => s.status !== 'Completed')
    .map(s => s.otNumber);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'otSchedule'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSchedule(data);
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!doctor || !speciality || !patientId || !date || !time || !otNumber) {
      alert('Please fill all fields');
      return;
    }

    let hour = 0, minute = 0;
    if (time.includes('AM') || time.includes('PM')) {
      const [hourMin, ampm] = time.split(' ');
      [hour, minute] = hourMin.split(':').map(Number);
      if (ampm.toLowerCase() === 'pm' && hour !== 12) hour += 12;
      if (ampm.toLowerCase() === 'am' && hour === 12) hour = 0;
    } else {
      [hour, minute] = time.split(':').map(Number);
    }

    const fullDateTime = new Date(date);
    fullDateTime.setHours(hour, minute);
    const formatted = fullDateTime.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    await addDoc(collection(db, 'otSchedule'), {
      doctor,
      speciality,
      patientId,
      otNumber,
      time: formatted,
      status: 'Scheduled'
    });

    setDoctor('');
    setSpeciality('');
    setPatientId('');
    setDate('');
    setTime('12:00 PM');
    setOtNumber('');
  };

  const markCompleted = async (id) => {
    await updateDoc(doc(db, 'otSchedule', id), { status: 'Completed' });
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 style={{ fontSize: '2rem', color: '#1e3a8a', marginBottom: '20px' }}>
          🛏️ OT Schedule Management
        </h1>

        {/* Add OT Slot Form */}
        <div style={sectionStyle}>
          <form
            onSubmit={handleAdd}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Doctor's Name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
            />
            <input
              type="text"
              placeholder="Speciality"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
            />
            <input
              type="text"
              placeholder="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
            />
            <TimePicker
              onChange={setTime}
              value={time}
              format="hh:mm a"
              disableClock={false}
              clearIcon={null}
              clockIcon={<span>🕑</span>}
              required
            />
            <select
              value={otNumber}
              onChange={(e) => setOtNumber(e.target.value)}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
            >
              <option value="">Select OT</option>
              {OT_LIST.map(ot => (
                <option key={ot} value={ot} disabled={occupiedOTs.includes(ot)}>
                  {ot} {occupiedOTs.includes(ot) ? '(Occupied)' : ''}
                </option>
              ))}
            </select>
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#2563eb',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Add OT Slot
            </button>
          </form>
        </div>

        {/* Scheduled OT List */}
        <div style={sectionStyle}>
          <h3 style={{ color: '#1e3a8a' }}>Scheduled Surgeries:</h3>
          {schedule.length === 0 ? (
            <p>No entries yet.</p>
          ) : (
            <ul>
              {schedule.map((item) => (
                <li key={item.id} style={{ marginBottom: '10px' }}>
                  <strong>{item.time}</strong> — Dr. {item.doctor} ({item.speciality}) for Patient{' '}
                  <strong>{item.patientId}</strong> in <strong>{item.otNumber}</strong>{' '}
                  (<span style={{ color: item.status === 'Completed' ? '#16a34a' : '#dc2626' }}>
                    {item.status}
                  </span>)
                  {item.status !== 'Completed' && (
                    <button
                      onClick={() => markCompleted(item.id)}
                      style={{
                        marginLeft: '15px',
                        backgroundColor: '#16a34a',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Mark Completed
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
