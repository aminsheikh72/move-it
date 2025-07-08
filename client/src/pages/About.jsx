import { motion } from 'framer-motion';
import AboutSection from '../components/AboutSection';
import { Users, Calendar, MapPin, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="text-primary-500" size={24} />, value: '5,000+', label: 'Happy Customers' },
    { icon: <Calendar className="text-primary-500" size={24} />, value: '3+ Years', label: 'In Business' },
    { icon: <MapPin className="text-primary-500" size={24} />, value: '50+', label: 'Cities Covered' },
    { icon: <Award className="text-primary-500" size={24} />, value: '99%', label: 'On-time Delivery' },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      position: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600',
      bio: 'With 15+ years in logistics and transportation, Alex founded Move it to revolutionize the industry.'
    },
    {
      name: 'Sarah Chen',
      position: 'Operations Director',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600',
      bio: 'Sarah ensures smooth daily operations and oversees our fleet management systems.'
    },
    {
      name: 'Michael Rodriguez',
      position: 'Customer Experience Lead',
      image: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1600',
      bio: 'Michael is dedicated to creating exceptional experiences for every Move it customer.'
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
      <section className="py-12 bg-dark-400">
        <div className="container mx-auto px-4">
        <section className="py-12 bg-dark-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-dark-200 rounded-xl p-6 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
          <div className="flex items-center justify-center ">
           
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://www.shutterstock.com/image-photo/large-quarry-dump-truck-carrying-600nw-2272427851.jpg" 
                  alt="About Move it" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      <AboutSection />

    
    </motion.div>
  );
};

export default About;