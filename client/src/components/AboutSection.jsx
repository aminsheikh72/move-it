import { motion } from 'framer-motion';
import { Shield, Clock, MapPin, Award } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Shield className="text-primary-500" size={36} />,
      title: 'Secure Transport',
      description: 'Your goods are fully insured and handled with the utmost care throughout the journey.'
    },
    {
      icon: <Clock className="text-primary-500" size={36} />,
      title: 'Timely Delivery',
      description: 'We pride ourselves on punctuality and delivering within the promised timeframe.'
    },
    {
      icon: <MapPin className="text-primary-500" size={36} />,
      title: 'Nationwide Service',
      description: 'Our services span across the country, ensuring we can help you wherever you are.'
    },
    {
      icon: <Award className="text-primary-500" size={36} />,
      title: 'Experienced Team',
      description: 'Our drivers and logistics specialists bring years of industry experience.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-primary-500">Move it</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Founded in 2020, Move it has quickly established itself as a leader in the transportation
            industry. We combine cutting-edge technology with experienced professionals to provide
            the most efficient and reliable transportation services.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-dark-200 p-6 rounded-xl border border-gray-800 hover:border-primary-500 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)' }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 bg-gradient-to-r from-dark-200 to-dark-300 rounded-2xl p-8 border border-gray-800"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-400 mb-4">
                At Move it, our mission is to revolutionize the transport industry by providing efficient, 
                reliable, and eco-friendly solutions. We aim to make transportation accessible to everyone 
                while minimizing our environmental footprint.
              </p>
              <p className="text-gray-400">
                We invest in modern vehicles and innovative technology to ensure that your goods reach 
                their destination safely and on time. Our dedicated team works tirelessly to provide exceptional 
                service that exceeds customer expectations.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://img.freepik.com/premium-photo/container-truck-mockup-advertising-isolated-white-background_669798-7705.jpg?semt=ais_hybrid&w=740" 
                  alt="Our team" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;