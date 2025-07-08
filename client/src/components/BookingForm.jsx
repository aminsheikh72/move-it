import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    weight: '',
  });
  const [recommendedVehicle, setRecommendedVehicle] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update recommended vehicle based on weight
    if (name === 'weight' && value) {
      const weight = parseFloat(value);
      if (weight <= 20) {
        setRecommendedVehicle('2-Wheeler');
      } else if (weight <= 100) {
        setRecommendedVehicle('3-Wheeler');
      } else if (weight <= 1000) {
        setRecommendedVehicle('4-Wheeler');
      } else {
        setRecommendedVehicle('Heavy Truck');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission would go here in a real application
    console.log('Form submitted:', formData);
    alert('Booking submitted successfully!');
  };

  return (
    <section className="py-16 flex items-center justify-center w-full">
   
          
          <motion.div 
            className="w-full md:w-[90%] bg-dark-200 rounded-2xl p-6 md:p-8 border border-gray-800"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Why Choose Our Booking Service?</h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary-500/20 mr-4">
                  <span className="text-primary-500 text-xl font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Intelligent Vehicle Matching</h4>
                  <p className="text-gray-400">Our system automatically recommends the best vehicle type based on your cargo weight.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary-500/20 mr-4">
                  <span className="text-primary-500 text-xl font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Real-time Tracking</h4>
                  <p className="text-gray-400">Track your shipment in real-time from pickup to delivery.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary-500/20 mr-4">
                  <span className="text-primary-500 text-xl font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Competitive Pricing</h4>
                  <p className="text-gray-400">Get the best rates based on distance and vehicle type.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary-500/20 mr-4">
                  <span className="text-primary-500 text-xl font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Insurance Coverage</h4>
                  <p className="text-gray-400">All shipments are insured for peace of mind.</p>
                </div>
              </div>
            </div>
          </motion.div>
        
     
    </section>
  );
};

export default BookingForm;