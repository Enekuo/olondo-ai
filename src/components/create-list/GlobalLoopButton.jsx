import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Repeat } from 'lucide-react';

    const GlobalLoopButton = ({ onToggleGlobalLoop, isGlobalLoopActive }) => {
      return (
        <div className="flex justify-center mb-4 sm:mb-6">
          <Button
            variant="default"
            size="default"
            onClick={onToggleGlobalLoop}
            className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-2 px-4 rounded-lg shadow-md"
          >
            <Repeat size={16} className="mr-2"/> {isGlobalLoopActive ? 'Parar Bucle General' : 'Bucle General'}
          </Button>
        </div>
      );
    };

    export default GlobalLoopButton;