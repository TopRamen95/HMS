import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function StaffHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    `${date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  

  const navLinkStyle = {
    padding: '10px 16px',
    textDecoration: 'none',
    color: '#1e3a8a',
    fontWeight: 'bold',
    borderBottom: '2px solid transparent'
  };

  const activeStyle = {
    borderBottom: '2px solid #2563eb',
    color: '#2563eb'
  };

  return (
    <header style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src="/logo.png" alt="CloudCure Logo" style={{ height: '60px', width: '60px', borderRadius: '50%' }} />
          <h1 style={{ fontSize: '2rem', color: '#1e3a8a', margin: 0 }}>CloudCure</h1>
        </div>
        <div style={{ fontWeight: 'bold', color: '#1e3a8a', fontSize: '1rem' }}>{formatTime(time)}</div>
      </div>

      <nav style={{
        display: 'flex',
        gap: '20px',
        padding: '12px 32px',
        backgroundColor: '#f1f5f9'
      }}>
        <NavLink to="/staff/dashboard" style={navLinkStyle} activeStyle={activeStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/staff/otschedule" style={navLinkStyle} activeStyle={activeStyle}>
          OT Schedule
        </NavLink>
        <NavLink to="/staff/pharmacy" style={navLinkStyle} activeStyle={activeStyle}>
          Pharmacy
        </NavLink>
        <NavLink to="/staff/alerts" style={navLinkStyle} activeStyle={activeStyle}>
          Alerts
        </NavLink>
      </nav>
    </header>
  );
}