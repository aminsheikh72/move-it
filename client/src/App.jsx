import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
 import { ToastContainer } from 'react-toastify';
import UserProfile from './pages/UserProfile';
import AdminLayout from './pages/admin/AdminLayout';

import Dashboard from './pages/admin/DashBoard';
import Users from './pages/admin/Users';
import Bookings from './pages/admin/Bookings';
import Reviews from './pages/admin/Reviews';
import Vehicles from './pages/admin/Vehicles';
import AddVehicle from './pages/admin/AddVehicle';
import PrivateRoute from './hooks/PrivateRoute';
import GetVehicles from './pages/userside/GetVehicles';
import MyBookings from './pages/MyBookings';
import ScrollToTop from './components/ScrollTop';


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <ScrollToTop/>
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route element={<PrivateRoute/>}>
              <Route path='/user-vehicles' element={<GetVehicles/>}/>
              <Route path='/my-bookings' element={<MyBookings/>}/>
            </Route>
            <Route path='/admin' element={<AdminLayout/>}>
              <Route index element={<Dashboard/>}/>  

              <Route path='dashboard' element={<Dashboard/>}/>  
              <Route path='users' element={<Users/>}/>  
              <Route path='bookings' element={<Bookings/>}/>  
              <Route path='reviews' element={<Reviews/>}/>  
              <Route path='vehicles' element={<Vehicles/>}/>  
              <Route path='add-vehicle' element={<AddVehicle/>}/>  







            </Route>
          </Routes>
           <ToastContainer />
        </AnimatePresence>
      </main>
      
    </div>
  );
}

export default App;