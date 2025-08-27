import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiGithub, FiZap } from 'react-icons/fi';

export default function Navbar() {
   const [scrolled, setScrolled] = useState(false);
   const [atTop, setAtTop] = useState(true);

   useEffect(() => {
      const handleScroll = () => {
         const isScrolled = window.scrollY > 10;
         const isAtTop = window.scrollY < 50;
         setScrolled(isScrolled);
         setAtTop(isAtTop);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <motion.nav
         className={`fixed w-full top-0 z-50 transition-all duration-300 ${
            scrolled
               ? 'bg-white shadow-lg py-2'
               : 'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-md py-4'
         }`}
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         transition={{ duration: 0.6, ease: 'easeOut' }}
      >
         <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <motion.div
               className="flex items-center space-x-2"
               whileHover={{ scale: 1.05 }}
               transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
               <div
                  className={`p-2 rounded-lg ${
                     scrolled
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                        : 'bg-white/20'
                  }`}
               >
                  <FiZap
                     className={
                        scrolled ? 'text-white text-xl' : 'text-white text-xl'
                     }
                  />
               </div>
               <h1
                  className={`text-xl font-bold ${
                     scrolled
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
                        : 'text-white'
                  }`}
               >
                  Review Summarizer
               </h1>
            </motion.div>

            <motion.a
               href="https://github.com/krishna-purohith/reviewSummarizer"
               target="_blank"
               rel="noopener noreferrer"
               className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-all duration-300 group ${
                  scrolled
                     ? 'bg-gray-100 hover:bg-gray-200'
                     : 'bg-white/10 hover:bg-white/20 text-white'
               }`}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
               <FiGithub
                  className={
                     scrolled
                        ? 'text-gray-700 group-hover:text-indigo-600'
                        : 'text-white'
                  }
               />
               <span
                  className={`text-sm font-medium ${
                     scrolled
                        ? 'text-gray-700 group-hover:text-indigo-600'
                        : 'text-white'
                  }`}
               >
                  GitHub
               </span>
            </motion.a>
         </div>
      </motion.nav>
   );
}
