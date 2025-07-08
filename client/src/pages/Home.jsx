import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import VehicleTypes from '../components/VehicleTypes';
import BookingForm from '../components/BookingForm';
import { ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      
      <AboutSection />
      
      <VehicleTypes />
      
      <BookingForm />

      <section className="py-16 bg-dark-200">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to <span className="text-primary-500">Move it</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of satisfied customers who trust us with their transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary flex items-center justify-center">
                Get Started <ArrowRight size={18} className="ml-2" />
              </button>
              <button className="btn-secondary flex items-center justify-center">
                Learn More
              </button>
             
            </div>
          </motion.div>
        </div>
      </section>
      
    </motion.div>
    <Footer/>
    
    </>
  );
};

export default Home;