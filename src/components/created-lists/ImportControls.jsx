import React, { useRef } from 'react';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import { UploadCloud } from 'lucide-react';

    const ImportControls = ({ onTextImport }) => {
      const fileInputRef = useRef(null);

      const handleFileImport = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target.result;
            onTextImport(text, file.name.split('.')[0] || "Lista de Archivo");
          };
          reader.readAsText(file);
        }
        event.target.value = null; 
      };

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1.5 text-white">Importar Texto</h2>
            <Textarea
              placeholder="Pega tu lista aquí (palabra - traducción)"
              className="h-28 bg-input border-primary/50 focus:border-primary focus:ring-primary text-sm text-white placeholder-slate-400"
              onChange={(e) => onTextImport(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1.5 text-white">Importar Archivo</h2>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="default"
              className="w-full h-28 border-dashed border-primary text-primary hover:bg-primary/10 hover:text-primary flex flex-col items-center justify-center"
            >
              <UploadCloud className="h-7 w-7 mb-1.5" />
              <span className="text-sm">Seleccionar archivo (.txt, .csv)</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".txt,.csv"
              onChange={handleFileImport}
            />
          </div>
        </div>
      );
    };

    export default ImportControls;