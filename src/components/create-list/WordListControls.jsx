import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Save } from 'lucide-react';

    const WordListControls = ({ onSave }) => {
      return (
        <div className="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-3 mt-auto pt-4">
          <Button
            onClick={onSave}
            size="lg"
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 hover:scale-105 py-2.5 px-5"
          >
            <Save className="mr-2 h-5 w-5" />
            Guardar Lista
          </Button>
        </div>
      );
    };
    export default WordListControls;