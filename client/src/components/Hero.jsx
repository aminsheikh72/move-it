import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import GetVehicles from '../pages/userside/GetVehicles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeBookingData } from '../../features/vehicles/vehicleSlice';

const Hero = () => {
const{user}=useSelector(state=>state.auth)
  const [loadingLocation, setLoadingLocation] = useState(false);
  const[formData,setFormData]=useState({
    pickupLocation : "", dropLocation : "", weight : ""
  })
  const{pickupLocation,dropLocation,weight}=formData
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const getCurrentLocation = () => {
  setLoadingLocation(true);
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const location = data?.display_name || `${latitude}, ${longitude}`;
        
        setFormData((prev) => ({
          ...prev,
          pickupLocation: location,
        }));
        
        setLoadingLocation(false);
      },
      (error) => {
        console.error('Location error:', error);
        setFormData((prev) => ({
          ...prev,
          pickupLocation: 'Unable to get location',
        }));
        setLoadingLocation(false);
      }
    );
  } else {
    setFormData((prev) => ({
      ...prev,
      pickupLocation: 'Geolocation not supported',
    }));
    setLoadingLocation(false);
  }
};

  const dispatch = useDispatch()
  const navigate= useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(storeBookingData(formData))
    localStorage.setItem("bookingData",JSON.stringify(formData))
    navigate('/user-vehicles')
  }

  return (
    <div className="relative min-h-screen flex items-center pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center gap-y-10 md:gap-x-10">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Transform Your <span className="text-primary-500">Moving Experience</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                Fast, reliable, and affordable transportation services for all your needs. From 2-wheelers to heavy trucks, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-start justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
               {!user ? (
                 <button onClick={()=>navigate('/login')} className="btn-primary flex items-center justify-center w-[180px]">
                  Book Now
                  <ArrowRight size={18} className="ml-2" />
                </button>
               ) : "" }
                
              </div>
            </motion.div>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-lg max-w-md mx-auto md:mx-0"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-white">
                Get An Instant Quote
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    className="input-field w-full"
                    name='pickupLocation'
                    value={pickupLocation}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="text-sm text-blue-400 absolute right-3 top-1/2 -translate-y-1/2 hover:underline"
                  >
                    {loadingLocation ? 'Detecting...' : '📍 Get My Location'}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Drop Location"
                  className="input-field w-full"
                         name='dropLocation'
                    value={dropLocation}
                    onChange={handleChange}
                    required
                />
                <input
                  type="number"
                  placeholder="Weight (in KG)"
                  className="input-field w-full"
                     name='weight'
                    value={weight}
                    onChange={handleChange}
                    required
                />
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  Calculate Quote
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
