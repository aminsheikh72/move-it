import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';


const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
       
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:ml-64 md:pt-20 pt-14">
        <div className="lg:hidden flex items-center justify-between px-4 py-3  text-white w-full  ">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={28} />
        </button>
        <h1 className="text-lg font-semibold">MoveIt Admin</h1>
      </div>
        <main className="p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
