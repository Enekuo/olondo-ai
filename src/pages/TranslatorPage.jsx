import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ArrowLeft, Construction } from 'lucide-react';

    const TranslatorPage = () => {
      const navigate = useNavigate();

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center justify-center min-h-screen w-full p-4"
        >
          <div className="absolute top-6 left-6">
            <Button variant="ghost" onClick={() => navigate('/options')} className="text-primary hover:bg-primary/10">
              <ArrowLeft className="mr-2 h-5 w-5" /> Volver a Opciones
            </Button>
          </div>
          <div className="bg-card/80 backdrop-blur-sm p-10 md:p-20 rounded-xl shadow-2xl text-center max-w-2xl w-full border border-primary/30">
            <Construction size={64} className="mx-auto mb-6 text-primary" />
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold text-white mb-6"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
              Traductor
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-slate-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Esta sección está en construcción. ¡Estamos trabajando para traerte una gran herramienta de traducción pronto!
            </motion.p>
          </div>
        </motion.div>
      );
    };

    export default TranslatorPage;