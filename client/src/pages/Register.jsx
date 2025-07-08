import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, EyeOff, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import DotsLoader from "../components/loaders/DotsLoader";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);

  const { name, email, phone, password, confirmPassword } = userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (password !== confirmPassword) {
      toast.error("Password does not match", { position: "top-center" });
      return
    }
    const finalData = {
      name,email,password,phone
    }
    dispatch(registerUser(finalData));
   
  };
  useEffect(()=>{
if(user){
  navigate('/')
}
},[user])
  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        position: "top-center",
      });
    }
     
  }, [isError, message]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center py-20"
    >
    {isLoading ? <DotsLoader/>:
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            className="bg-dark-200 rounded-2xl shadow-custom-lg p-8 border border-gray-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <UserPlus className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-gray-400 mt-2">
                Join Move it for easier shipping
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>

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
                <label htmlFor="phone" className="block text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
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
                    type={showPassword ? "text" : "password"}
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
              </motion.button>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary-500 hover:text-primary-400"
                  >
                    Sign In
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

export default Register;
