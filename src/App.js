import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaffLayout from './pages/staff/StaffLayout';
import PatientLayout from './pages/PatientLayout';
import Dashboard from './pages/Dashboard';
import OTSchedule from './pages/OTSchedule';
import Pharmacy from './pages/Pharmacy';
import Alerts from './pages/Alerts';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Staff View */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="otschedule" element={<OTSchedule />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>

        {/* Patient View */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
