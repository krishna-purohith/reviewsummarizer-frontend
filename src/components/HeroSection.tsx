import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiStar, FiTrendingUp, FiZap } from 'react-icons/fi';

export default function HeroSection() {
   const [currentFeature, setCurrentFeature] = useState(0);

   const features = [
      {
         icon: <FiStar className="text-2xl" />,
         text: 'AI-Powered Insights',
      },
      {
         icon: <FiZap className="text-2xl" />,
         text: 'Instant Summaries',
      },
      {
         icon: <FiTrendingUp className="text-2xl" />,
         text: 'Data-Driven Decisions',
      },
   ];

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentFeature((prev) => (prev + 1) % features.length);
      }, 3000);

      return () => clearInterval(interval);
   }, [features.length]);

   return (
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white pt-28 pb-24 overflow-hidden">

         <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(5)].map((_, i) => (
               <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                     width: Math.random() * 100 + 50,
                     height: Math.random() * 100 + 50,
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                     scale: [1, 1.2, 1],
                     opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                     duration: Math.random() * 10 + 10,
                     repeat: Infinity,
                     delay: Math.random() * 5,
                  }}
               />
            ))}
         </div>

         <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <motion.h2
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-4xl md:text-5xl font-bold mb-6"
            >
               Transform Customer Feedback into{' '}
               <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Actionable Insights
               </span>
            </motion.h2>

            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto"
            >
               Browse products, read reviews, and let our AI summarize customer
               feedback in seconds—helping you make informed decisions faster.
            </motion.p>

            <motion.div
               className="flex flex-wrap justify-center gap-6"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.9, duration: 0.6 }}
            >
               {features.map((feature, index) => (
                  <motion.div
                     key={index}
                     className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        index === currentFeature
                           ? 'bg-white/20 border border-white/30'
                           : 'bg-white/10 border border-white/10'
                     }`}
                     animate={{
                        scale: index === currentFeature ? 1.05 : 1,
                     }}
                     transition={{ duration: 0.3 }}
                  >
                     <div className="text-yellow-300">{feature.icon}</div>
                     <span className="font-medium">{feature.text}</span>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>
   );
}
