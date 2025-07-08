import { motion } from 'framer-motion';
import { Truck, Package, Clock, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ServicesSection = () => {


  const{pathname}=useLocation()
     

  const services = [
    {
      icon: <Truck className="text-primary-500" size={36} />,
      title: 'Transportation',
      description: 'We offer transportation services for goods of all sizes, from small packages to large shipments.',
      features: ['Multiple vehicle options', 'Nationwide coverage', 'Competitive rates']
    },
    {
      icon: <Package className="text-primary-500" size={36} />,
      title: 'Packaging',
      description: 'Our professional packaging services ensure your items are secure and protected during transit.',
      features: ['Custom packaging solutions', 'High-quality materials', 'Fragile item handling']
    },
    {
      icon: <Clock className="text-primary-500" size={36} />,
      title: 'Express Delivery',
      description: 'Need urgent delivery? Our express service ensures your goods reach their destination quickly.',
      features: ['Same-day delivery', 'Priority handling', 'Real-time tracking']
    },
    {
      icon: <Users className="text-primary-500" size={36} />,
      title: 'Specialized Transport',
      description: 'We provide specialized transportation for unique items requiring extra care or handling.',
      features: ['Trained specialists', 'Custom equipment', 'Extra safety measures']
    }
  ];
  useEffect(()=>{
window.scrollTo(0,0)
  },[])
  
  return (
    <section className="py-16 bg-dark-400">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-primary-500">Services</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We offer a comprehensive range of transportation and logistics services to meet your needs.
            From standard deliveries to specialized transport, we've got you covered.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-dark-300 rounded-xl overflow-hidden shadow-custom"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center mb-4">
                  <div className="mr-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-400">{service.description}</p>
              </div>
              <div className="p-6">
                <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Features</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mr-3"></div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-6">
            Not sure which service best fits your needs? Contact our team for personalized assistance.
          </p>
          <button className="btn-primary">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;