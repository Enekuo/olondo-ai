import React, { useRef } from 'react';
    import { Button } from '@/components/ui/button';
    import { Upload } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    const ImportControls = ({ onTextImport, pastedText }) => {
      const { toast } = useToast();
      const fileInputRef = useRef(null);

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          if (file.type === "text/plain" || file.name.endsWith(".csv")) {
            const reader = new FileReader();
            reader.onload = (e) => {
              onTextImport(e.target.result, file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
            };
            reader.readAsText(file);
          } else {
            toast({ title: "Archivo no Soportado", description: "Por favor, sube un archivo .txt o .csv.", variant: "destructive" });
          }
        } else if (pastedText && pastedText.trim() !== "") {
            onTextImport(pastedText, "Lista Pegada");
        }
        if (event.target) event.target.value = null; 
      };
      
      const handleUploadClick = () => {
        if (pastedText && pastedText.trim() !== "") {
           onTextImport(pastedText, "Lista Pegada");
        } else {
          fileInputRef.current.click();
        }
      };

      return (
        <>
          <Button onClick={handleUploadClick} className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-2 px-3 rounded-md text-sm">
            <Upload size={16} className="mr-2" /> {pastedText.trim() ? 'Procesar Texto y Subir Archivo' : 'Subir Archivo (.txt, .csv)'}
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".txt,.csv" className="hidden" />
        </>
      );
    };

    export default ImportControls;