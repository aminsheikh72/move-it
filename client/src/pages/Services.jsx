import { motion } from 'framer-motion';
import ServicesSection from '../components/ServicesSection';
import VehicleTypes from '../components/VehicleTypes';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Services = () => {
  const specialServices = [
    'Temperature-controlled transport',
    'Fragile item handling',
    'Express overnight delivery',
    'International shipping',
    'Warehousing solutions',
    'Custom packaging',
    'Insurance coverage',
    'Heavy equipment transport'
  ];

  const testimonials = [
    {
      name: 'Jennifer B.',
      company: 'Small Business Owner',
      quote: 'Move it has been a game-changer for my small business. Their reliable delivery service has helped me expand to new areas.',
      rating: 5
    },
    {
      name: 'Mark T.',
      company: 'Construction Manager',
      quote: 'We rely on Move it for transporting heavy equipment between job sites. Their precision and care are unmatched.',
      rating: 5
    },
    {
      name: 'Priya S.',
      company: 'E-commerce Entrepreneur',
      quote: 'My customers love the fast delivery times that Move it provides. It has significantly improved my customer satisfaction ratings.',
      rating: 4
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20"
    >
     

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Specialized <span className="text-primary-500">Services</span></h2>
              <p className="text-gray-400 mb-8">
                Beyond our standard offerings, we provide a range of specialized services to meet unique transportation challenges.
                Our team of experts is equipped to handle even the most complex logistics requirements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialServices.map((service, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CheckCircle className="text-primary-500 mr-2 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{service}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.button 
                className="btn-primary flex items-center mt-8"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Request Custom Service
                <ArrowRight size={18} className="ml-2" />
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-xl overflow-hidden h-96">
                <img 
                  src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Specialized Services" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <VehicleTypes />

      <section className="py-16 bg-dark-200">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-3">
              Client <span className="text-primary-500">Testimonials</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-dark-300 rounded-xl p-6 border border-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-highlight-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;