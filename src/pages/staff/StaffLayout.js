import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffHeader from '../../components/StaffHeader';

export default function StaffLayout() {
  return (
    <>
      <StaffHeader />
      <Outlet />
    </>
  );
}
