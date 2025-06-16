import './output.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Page Imports
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardDoctor from './pages/DashboardDoctor';
import DashboardStaff from './pages/DashboardStaff';
import DashboardPatient from './pages/DashboardPatient';
import PublicDisplay from './pages/PublicDisplay';
import DashboardOT from './pages/DashboardOt';
import DashboardRegistration from './pages/DashboardRegistration';
import DashboardPharmacy from './pages/DashboardPharmacy';
import AddDoctor from './pages/AddDoctor';
import ManageDoctors from './pages/ManageDoctors';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <DashboardAdmin />,
  },
  {
    path: '/doctor',
    element: <DashboardDoctor />,
  },
  {
    path: '/staff',
    element: <DashboardStaff />,
  },
  {
    path: '/patient',
    element: <DashboardPatient />,
  },
  {
    path: '/ot',
    element: <DashboardOT />,
  },
  {
    path: '/registration',
    element: <DashboardRegistration />,
  },
  {
    path: '/pharmacy',
    element: <DashboardPharmacy />,
  },
  {
    path: '/admin/add-doctor',
    element: <AddDoctor />,
  },
  {
    path: '/admin/manage-doctors',
    element: <ManageDoctors />,
  },
  {
    path: '/display',
    element: <PublicDisplay />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
