import React from 'react';
    import { Button } from '@/components/ui/button';
    import { ArrowLeft } from 'lucide-react';

    const CreateListPageHeader = ({ onBack }) => {
      return (
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary hover:bg-primary/10 hover:text-primary px-2 sm:px-3">
            <ArrowLeft className="mr-1 h-4 w-4 sm:h-5 sm:w-5" /> Volver
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white flex-1 truncate px-2 sm:px-4">
            Crear Lista de Palabras
          </h1>
          <div className="w-20 sm:w-24 hidden sm:block"></div>
        </div>
      );
    };

    export default CreateListPageHeader;