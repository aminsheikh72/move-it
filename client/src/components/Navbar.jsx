import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Menu, X, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout success", { position: "top-center" });
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-300/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Truck className="text-primary-500" size={32} />
            <span className="text-2xl font-bold text-white">
              Move<span className="text-primary-500">it</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Services
            </NavLink>
            {user && (
              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                My bookings
              </NavLink>
            )}
            {user?.isAdmin ? (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Admin
              </NavLink>
            ) : (
              ""
            )}
            {!user ? (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            ) : (
              <>
                <button
                  className=" text-white focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X size={24} />
                  ) : (
                    <Link to={"/profile"}>
                      <User size={24} />
                    </Link>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className=" px-3 py-2 bg-red-600 rounded-lg text-white"
                >
                  LOGOUT
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className=" md:hidden flex items-center justify-center px-3 space-x-2">
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {user ? (
              <Link to={"/profile"}>
                <User className=" w-6 h-6" />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-dark-200 shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 py-4 bg-black">
            <nav className="flex flex-col space-y-4 ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} py-2`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} py-2`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} py-2`
                }
              >
                Services
              </NavLink>
              {user && (
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  My bookings
                </NavLink>
              )}
              {user?.isAdmin ? (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""} py-2`
                  }
                >
                  Admin Panel
                </NavLink>
              ) : (
                <></>
              )}
              {!user ? (
                <Link to="/login" className="btn-primary text-center">
                  Login
                </Link>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className=" px-3 py-2 bg-red-600 rounded-lg text-white"
                  >
                    LOGOUT
                  </button>
                </>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
