import React from 'react';
import { 
  Users, 
  Calendar, 
  Star, 
  Truck, 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  User,
  LogOut,
  X
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logoutUser } from '../../../features/auth/authSlice';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const {user}= useSelector(state=> state.auth)
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Settings },
    { id: 'users', label: 'All Users', icon: Users },
    { id: 'bookings', label: 'All Bookings', icon: Calendar },
    { id: 'reviews', label: 'All Reviews', icon: Star },
    { id: 'vehicles', label: 'Get All Vehicles', icon: Truck },
    { id: 'add-vehicle', label: 'Add Vehicle', icon: Plus }
  ];
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {pathname} = useLocation()
    const handleLogout=()=>{
      dispatch(logoutUser())
      toast.success("Logout success",{position : "top-center"})
      navigate('/')
    }

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md border-r border-white/20 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Truck className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-white">MoveIt Admin</h1>
            </div>
            <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
               <Link
  key={item.id}
  to={`/admin/${item.id}`}
  onClick={() => setSidebarOpen(false)}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
    pathname === `/admin/${item.id}`
      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      : 'text-gray-300 hover:bg-white/10 hover:text-white'
  }`}
>
  <item.icon size={20} />
  <span>{item.label}</span>
</Link>

              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <div>
              <p className="text-white font-medium">Admin User</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
          {
            user? (<><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            <LogOut size={16} />
            <span>Logout</span>
          </button></>) 
          : (<><button onClick={navigate("/login")} className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            <LogOut size={16} />
            <span>LogIn</span>
          </button></>)
          }
        </div>
      </div>
    </>
  );
};

export default Sidebar;