import React from 'react';
    import { Textarea } from '@/components/ui/textarea';
    import ImportControls from '@/components/import-list/ImportControls';

    const ImportArea = ({ pastedText, onPastedTextChange, onTextImport }) => {
      return (
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-secondary/40 rounded-lg border border-primary/30 shadow-lg mb-6">
            <h2 className="text-lg font-semibold text-white mb-3 text-center">Importar Lista</h2>
            <Textarea
              placeholder="Pega aquí tu lista (palabra - traducción por línea o palabra / traducción por línea)..."
              className="w-full h-24 sm:h-32 p-2 border border-primary/50 rounded-md mb-3 bg-input text-white placeholder-slate-400 focus:ring-primary focus:border-primary"
              value={pastedText}
              onChange={onPastedTextChange}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <ImportControls onTextImport={() => onTextImport(pastedText)} pastedText={pastedText} />
            </div>
          </div>
        </div>
      );
    };

    export default ImportArea;