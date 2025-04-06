
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bgImageUrl?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  bgImageUrl = "/placeholder.svg" 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16">
        <div className="relative bg-cinema-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src={bgImageUrl} 
              alt="" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-accent-red/40 to-black"></div>
          </div>
          
          <div className="relative z-10 py-16 md:py-24 cinema-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="heading-lg mb-4">{title}</h1>
              {subtitle && (
                <p className="text-lg text-white/80 md:text-xl max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="cinema-container py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
