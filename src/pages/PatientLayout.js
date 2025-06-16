import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PatientLayout() {
  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Outlet />
    </div>
  );
}
