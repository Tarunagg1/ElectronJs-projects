import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar } from './Nabbar';

export const Layoout: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <Navbar />
      <div className="py-2 px-6">
        <Outlet />
      </div>
    </div>
  );
};
