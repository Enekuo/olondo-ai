import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Repeat, Save } from 'lucide-react';

    const GlobalControls = ({ isGlobalLooping, onToggleGlobalLoop, wordPairsCount, onSaveImportedList }) => {
      if (wordPairsCount === 0 && !onSaveImportedList) return null;

      return (
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
          {wordPairsCount > 0 && (
            <Button
              onClick={onToggleGlobalLoop}
              size="default"
              variant={isGlobalLooping ? "default" : "outline"}
              className={`w-full sm:w-auto font-semibold rounded-lg shadow-md ${
                isGlobalLooping ? 'bg-primary text-white hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary/10'
              }`}
            >
              <Repeat className="mr-1.5 h-4 w-4" />
              {isGlobalLooping ? 'Parar Bucles' : 'Iniciar Bucles'}
            </Button>
          )}
          {onSaveImportedList && (
             <Button
              onClick={onSaveImportedList}
              size="default"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md"
              disabled={wordPairsCount === 0}
            >
              <Save className="mr-1.5 h-4 w-4" />
              Guardar Lista Importada
            </Button>
          )}
        </div>
      );
    };

    export default GlobalControls;