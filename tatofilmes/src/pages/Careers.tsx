
import React from 'react';
import { motion } from 'framer-motion';
import { Check, FileText, MapPin, Clock, Users, Briefcase } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';

const Careers = () => {
  const benefits = [
    "Ingressos gratuitos para funcionários",
    "Descontos exclusivos em alimentos e bebidas",
    "Plano de saúde e odontológico",
    "Vale-refeição e vale-transporte",
    "Programa de desenvolvimento profissional",
    "Ambiente de trabalho dinâmico e criativo",
    "Oportunidades de crescimento na carreira"
  ];

  const jobOpenings = [
    {
      title: "Atendente de Cinema",
      location: "Copacabana, Rio de Janeiro",
      type: "Tempo integral",
      department: "Operações",
      description: "Responsável pelo atendimento ao cliente, venda de ingressos e orientação de espectadores."
    },
    {
      title: "Técnico de Projeção",
      location: "Barra da Tijuca, Rio de Janeiro",
      type: "Tempo integral",
      department: "Técnico",
      description: "Operar e manter equipamentos de projeção e som, garantindo a qualidade das exibições."
    },
    {
      title: "Coordenador de Marketing",
      location: "Ipanema, Rio de Janeiro",
      type: "Tempo integral",
      department: "Marketing",
      description: "Desenvolver e implementar estratégias de marketing para o cinema, incluindo promoções e parcerias."
    },
    {
      title: "Assistente Administrativo",
      location: "Centro, Rio de Janeiro",
      type: "Tempo integral",
      department: "Administração",
      description: "Suporte em processos administrativos, financeiros e recursos humanos."
    },
    {
      title: "Atendente da Bomboniere",
      location: "Botafogo, Rio de Janeiro",
      type: "Meio período",
      department: "Alimentos e Bebidas",
      description: "Preparar e vender alimentos e bebidas, mantendo a área limpa e organizada."
    }
  ];

  return (
    <PageLayout 
      title="Carreiras" 
      subtitle="Faça parte da família TatoFilmes e ajude a transformar a experiência de cinema no Rio de Janeiro"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?team,office"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div className="space-y-6">
          <motion.h2 
            className="heading-md text-cinema-900 dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Por que trabalhar conosco?
          </motion.h2>
          
          <motion.p 
            className="text-cinema-600 dark:text-cinema-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No TatoFilmes, acreditamos que nossos funcionários são a chave do nosso sucesso. Oferecemos um ambiente 
            de trabalho colaborativo e dinâmico, onde você pode crescer profissionalmente enquanto faz parte de uma 
            equipe apaixonada por cinema.
          </motion.p>
          
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-cinema-900 dark:text-white">Benefícios</h3>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-accent-red flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-cinema-600 dark:text-cinema-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <img 
            src="https://source.unsplash.com/random/800x600/?cinema,team" 
            alt="Equipe TatoFilmes" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="mb-20">
        <motion.h2 
          className="heading-md text-cinema-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Vagas Disponíveis
        </motion.h2>
        
        <div className="space-y-6">
          {jobOpenings.map((job, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-cinema-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="md:flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-cinema-900 dark:text-white">{job.title}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 text-cinema-600 dark:text-cinema-400 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm">{job.type}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm">{job.department}</span>
                    </div>
                  </div>
                  
                  <p className="text-cinema-600 dark:text-cinema-300 mb-4">{job.description}</p>
                </div>
                
                <Button className="bg-accent-red hover:bg-accent-red/90 mt-4 md:mt-0 w-full md:w-auto flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Candidatar-se
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="bg-cinema-50 dark:bg-cinema-800 rounded-xl p-8 mb-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-sm text-cinema-900 dark:text-white mb-4">Não encontrou a vaga ideal?</h2>
          <p className="text-cinema-600 dark:text-cinema-300 mb-6">
            Envie-nos seu currículo e fique no nosso banco de talentos. Entraremos em contato quando surgir uma 
            oportunidade que combine com o seu perfil.
          </p>
          <Button variant="outline" className="flex items-center mx-auto">
            <Users className="h-4 w-4 mr-2" />
            Enviar currículo espontâneo
          </Button>
        </div>
      </motion.div>

      <div className="text-center">
        <motion.h3 
          className="text-xl font-semibold mb-4 text-cinema-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Dúvidas sobre o processo seletivo?
        </motion.h3>
        <motion.p 
          className="text-cinema-600 dark:text-cinema-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          Entre em contato com nosso departamento de Recursos Humanos:<br />
          <span className="font-medium text-cinema-900 dark:text-white">
            rh@tatofilmes.com.br | (21) 3333-4455
          </span>
        </motion.p>
      </div>
    </PageLayout>
  );
};

export default Careers;
