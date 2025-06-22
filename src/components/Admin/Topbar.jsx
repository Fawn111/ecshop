import React from 'react';

const Topbar = () => {
  return (
    <header className="h-16 bg-white shadow px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-black tracking-tight">Admin Dashboard</h1>
      <div className="text-gray-600">
        <button>Admin</button>
      </div>

    </header>
  );
};

export default Topbar;
