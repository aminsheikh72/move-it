import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, EyeOff, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import DotsLoader from '../components/loaders/DotsLoader';

const Login = () => {
  const  {user, isLoading,isError, message , isSuccess}= useSelector(state=> state.auth)

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { password, email } = credentials;
  const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(loginUser(credentials)) 
   
}
useEffect(()=>{
if(user){
  navigate('/')
}
},[user])

  useEffect(()=>{
  if(isError && message){
    toast.error(message,{
      position  :"top-center"
    })
  }
    },[isError,message])
    

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center py-20"
    >
    {isLoading ? <DotsLoader/> : 
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div 
            className="bg-dark-200 rounded-2xl shadow-custom-lg p-8 border border-gray-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <LogIn className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-400 mt-2">Sign in to your Move it account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-field pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>


              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-500 hover:text-primary-400">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>}
    </motion.div>
  );
};

export default Login;