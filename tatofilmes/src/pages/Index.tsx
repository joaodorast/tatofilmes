
import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedMovies from '@/components/home/FeaturedMovies';
import ComingSoon from '@/components/home/ComingSoon';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  // Rolar para o topo ao carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FeaturedMovies />
          <ComingSoon />
          
          <section className="py-16 md:py-20 bg-white dark:bg-cinema-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent-red to-accent-gold opacity-10"></div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="small-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#small-grid)"></rect>
              </svg>
            </div>
            <div className="cinema-container relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cinema-900 dark:text-white">
                    A Experiência Definitiva de Cinema
                  </h2>
                  <p className="text-lg text-cinema-600 dark:text-cinema-300 mb-8">
                    Mergulhe na tecnologia de ponta e no conforto incomparável.
                    Com poltronas premium, som Dolby Atmos e projeção 4K cristalina,
                    nossos cinemas redefinem a experiência de assistir filmes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="p-6 rounded-xl bg-cinema-50 dark:bg-cinema-900 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red mb-4 mx-auto">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-cinema-900 dark:text-white">Conforto Premium</h3>
                      <p className="text-cinema-600 dark:text-cinema-400">
                        Poltronas reclináveis luxuosas projetadas para o máximo relaxamento
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-cinema-50 dark:bg-cinema-900 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red mb-4 mx-auto">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-4.242 4.242m-7.072 0a9 9 0 010-12.728l4.242 4.242" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-cinema-900 dark:text-white">Som Imersivo</h3>
                      <p className="text-cinema-600 dark:text-cinema-400">
                        Som surround Dolby Atmos para uma experiência verdadeiramente imersiva
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-cinema-50 dark:bg-cinema-900 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red mb-4 mx-auto">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-cinema-900 dark:text-white">Nitidez Cristalina</h3>
                      <p className="text-cinema-600 dark:text-cinema-400">
                        Projeção a laser 4K para visuais mais nítidos e vibrantes
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          <section className="py-12 md:py-16 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-red to-accent-gold opacity-10"></div>
            <div className="cinema-container relative z-10">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-white md:w-2/3">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Entre para o Clube TatoFilmes</h2>
                  <p className="text-white/80 text-lg mb-6">
                    Obtenha benefícios exclusivos, acumule pontos em cada compra e desfrute de descontos especiais em ingressos e alimentos.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {['Acesso antecipado a estreias de blockbusters', 'Sessões exclusivas para membros', 'Ingressos com desconto toda terça-feira', 'Ganhe pontos para ingressos grátis'].map((benefit, index) => (
                      <li key={index} className="flex items-center text-white/80">
                        <svg className="w-5 h-5 mr-2 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <button className="bg-accent-red hover:bg-accent-red/90 text-white px-6 py-3 rounded-full font-medium">
                    Cadastre-se Agora
                  </button>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-cinema-950 p-6 rounded-xl border border-white/10">
                    <div className="text-center mb-4">
                      <span className="inline-block bg-gradient-to-r from-accent-red to-accent-gold text-transparent bg-clip-text text-2xl font-bold">MEMBRO OURO</span>
                    </div>
                    <div className="w-40 h-40 mx-auto bg-gradient-to-r from-accent-red/20 to-accent-gold/20 rounded-full flex items-center justify-center mb-4">
                      <div className="w-36 h-36 rounded-full bg-black flex items-center justify-center">
                        <svg className="w-20 h-20 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <circle cx="12" cy="8" r="5" />
                          <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center text-white/80">
                      <p className="font-medium">João Silva</p>
                      <p className="text-sm">Membro desde 2023</p>
                      <div className="mt-2 flex items-center justify-center">
                        <svg className="w-5 h-5 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l2.5 6.5H21l-5 4.5 2 7L12 16l-6 4 2-7-5-4.5h6.5z" />
                        </svg>
                        <span className="ml-1 font-semibold text-white">1.250 pontos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
