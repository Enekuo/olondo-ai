import React from 'react';
    import { Button } from '@/components/ui/button';
    import { ArrowLeft } from 'lucide-react';

    const CreatedListsPageHeader = ({ viewMode, onBack }) => {
      let title = 'Listas Creadas';
      if (viewMode === 'editImported') title = 'Editar Lista Importada';
      else if (viewMode === 'editSaved') title = 'Editar Lista Guardada';

      return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white order-1 sm:order-2 flex-1 truncate px-2 mb-2 sm:mb-0">
            {title}
          </h1>
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary hover:bg-primary/10 order-2 sm:order-1 self-start sm:self-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> {viewMode === 'select' ? 'Volver' : 'Atrás a Listas'}
          </Button>
          <div className="w-20 hidden sm:block order-3"></div>
        </div>
      );
    };

    export default CreatedListsPageHeader;