import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ArrowLeft, PlusCircle, Upload, ListChecks, BookHeart } from 'lucide-react';

    const OptionsPage = () => {
      const navigate = useNavigate();

      const options = [
        {
          title: "Crear Lista de Palabras",
          description: "Construye tus propias listas desde cero.",
          icon: <PlusCircle className="h-8 w-8 text-primary" />,
          path: "/create-list",
          color: "hover:border-green-500/50 hover:shadow-green-500/20"
        },
        {
          title: "Copiar Lista o archivo",
          description: "Importa listas desde texto o archivos.",
          icon: <Upload className="h-8 w-8 text-primary" />,
          path: "/import-list",
          color: "hover:border-blue-500/50 hover:shadow-blue-500/20"
        },
        {
          title: "Listas Creadas",
          description: "Explora listas predefinidas por categorías.",
          icon: <ListChecks className="h-8 w-8 text-primary" />,
          path: "/created-lists",
          color: "hover:border-purple-500/50 hover:shadow-purple-500/20"
        },
        {
          title: "Mis Listas",
          description: "Accede a todas tus listas guardadas.",
          icon: <BookHeart className="h-8 w-8 text-primary" />,
          path: "/my-lists",
          color: "hover:border-yellow-500/50 hover:shadow-yellow-500/20"
        }
      ];

      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: "easeOut"
          }
        })
      };

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center min-h-screen w-full p-2 sm:p-4"
        >
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-primary hover:bg-primary/10 px-2 sm:px-3">
              <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm">Volver al Inicio</span>
            </Button>
          </div>

          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 sm:mb-8 md:mb-12 text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          >
            Herramientas de Aprendizaje
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-2xl md:max-w-3xl">
            {options.map((option, i) => (
              <motion.div
                key={option.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`bg-card/70 backdrop-blur-md p-4 sm:p-5 rounded-xl shadow-lg border border-primary/30 transition-all duration-300 ease-out cursor-pointer ${option.color} hover:shadow-xl hover:scale-105 h-full flex flex-col`}
                onClick={() => navigate(option.path)}
              >
                <div className="flex items-center mb-2 sm:mb-3">
                  {option.icon}
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white ml-3">{option.title}</h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 flex-grow">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    };

    export default OptionsPage;