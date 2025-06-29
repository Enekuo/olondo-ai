import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { UploadCloud, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['application/pdf', 'text/plain', 'text/markdown', 'audio/mpeg', 'audio/mp3'];
const ALLOWED_FILE_EXTENSIONS_DISPLAY = 'PDF, .txt, Markdown, MP3';

const ContentInputModal = ({ isOpen, onOpenChange, onContentSubmit }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: t('contentInputModalFileTooLarge', 'El archivo es demasiado grande. El tamaño máximo es {maxSize}MB.', { maxSize: MAX_FILE_SIZE_MB }),
        variant: "destructive",
      });
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type) && !ALLOWED_FILE_TYPES.some(type => file.name.endsWith(type.split('/')[1]))) {
       if (!ALLOWED_FILE_TYPES.some(allowedType => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!extension) return false;
        if (allowedType === 'text/markdown' && extension === 'md') return true;
        if (allowedType === 'audio/mpeg' && extension === 'mp3') return true;
        if (allowedType === 'audio/mp3' && extension === 'mp3') return true;
        return allowedType.endsWith(extension);
    })) {
        toast({
            title: t('contentInputModalInvalidFileType', 'Tipo de archivo no válido. Tipos permitidos: {allowedTypes}.', { allowedTypes: ALLOWED_FILE_EXTENSIONS_DISPLAY }),
            variant: "destructive",
        });
        return;
      }
    }
    setSelectedFile(file);
    setShowPasteArea(false);
    setPastedText('');
    toast({
      title: t('contentInputModalUploadSuccess', '¡Archivo "{fileName}" subido con éxito!', { fileName: file.name }),
    });
    if(onContentSubmit) onContentSubmit({ type: 'file', content: file, name: file.name });
    
    const shouldSimulateLimit = Math.random() < 0.3; 
    if (shouldSimulateLimit) {
      toast({
        title: t('contentInputModalLimitReachedTitle', 'Límite Alcanzado'),
        description: t('contentInputModalLimitReachedDescription', 'Has alcanzado el límite gratuito. Suscríbete al Plan Premium para seguir creando sin límites.'),
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handlePasteButtonClick = () => {
    setShowPasteArea(true);
    setSelectedFile(null);
  };

  const handleProcessPastedText = () => {
    if (!pastedText.trim()) {
      toast({
        title: t('contentInputModalNoTextToProcess', 'No hay texto para procesar. Por favor, pega algo de texto.'),
        variant: "destructive",
      });
      return;
    }
    toast({
      title: t('contentInputModalTextProcessed', '¡Texto procesado con éxito!'),
    });
    if(onContentSubmit) onContentSubmit({ type: 'text', content: pastedText });
    
    const shouldSimulateLimit = Math.random() < 0.3; 
    if (shouldSimulateLimit) {
      toast({
        title: t('contentInputModalLimitReachedTitle', 'Límite Alcanzado'),
        description: t('contentInputModalLimitReachedDescription', 'Has alcanzado el límite gratuito. Suscríbete al Plan Premium para seguir creando sin límites.'),
        variant: "destructive",
        duration: 7000,
      });
    }
  };
  
  const handleModalOpenChange = (open) => {
    if (!open) {
      setSelectedFile(null);
      setPastedText('');
      setShowPasteArea(false);
      setIsDragging(false);
    }
    onOpenChange(open);
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
      <DialogContent 
        className="sm:max-w-3xl bg-white dark:bg-slate-900 p-0 rounded-lg shadow-2xl overflow-hidden"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-lg border-4 border-dashed border-primary">
            <UploadCloud size={64} className="text-primary mb-4" />
            <p className="text-xl font-semibold text-primary">{t('contentInputModalUploadSubtitle', 'Arrastra y suelta o')}</p>
          </div>
        )}
        <DialogHeader className="p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">{t('contentInputModalTitle')}</DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                {t('contentInputModalDescription')}
              </DialogDescription>
            </div>
            {/* This DialogClose renders the button. No need for an extra Button component inside. */}
            <DialogClose className="rounded-full p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X size={20} />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div 
            className={`relative p-8 border-2 border-dashed rounded-lg transition-colors duration-200 ease-in-out text-center cursor-pointer
                        ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary bg-slate-50 dark:bg-slate-800/50'}`}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <UploadCloud size={48} className={`mx-auto mb-3 ${isDragging ? 'text-primary' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary'}`} />
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">
              {t('contentInputModalUploadTitle')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('contentInputModalUploadSubtitle')}{' '}
              <span className="text-primary font-medium hover:underline">
                {t('contentInputModalUploadSubtitleLink')}
              </span>
            </p>
            <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept={ALLOWED_FILE_TYPES.join(',')} />
            {selectedFile && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-green-600 dark:text-green-400 mt-2"
              >
                {t('contentInputModalFileSelected', 'Archivo seleccionado: {fileName}', { fileName: selectedFile.name })}
              </motion.p>
            )}
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              {t('contentInputModalUploadAllowed', 'Tipos de archivo admitidos: PDF, .txt, Markdown, Audio (por ejemplo, MP3)')}
            </p>
          </div>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-400 dark:text-slate-500 uppercase">{t('or', 'O')}</span>
            <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
          </div>
          
          <AnimatePresence mode="wait">
            {!showPasteArea ? (
              <motion.div
                key="pasteButton"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <Button 
                  variant="outline" 
                  onClick={handlePasteButtonClick}
                  className="w-full sm:w-auto px-8 py-6 text-base border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10"
                >
                  <FileText size={18} className="mr-2" />
                  {t('contentInputModalPasteButton')}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="pasteArea"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3"
              >
                <Label htmlFor="pasted-text" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('contentInputModalPasteTitle')}
                </Label>
                <Textarea
                  id="pasted-text"
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder={t('contentInputModalPastePlaceholder')}
                  rows={6}
                  className="bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 focus:border-primary dark:focus:border-primary"
                />
                <div className="flex justify-end space-x-3 pt-2">
                  <Button variant="ghost" onClick={() => setShowPasteArea(false)} className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                    {t('contentInputModalPasteCancel')}
                  </Button>
                  <Button onClick={handleProcessPastedText} className="bg-primary hover:bg-primary/90 text-white">
                    {t('contentInputModalPasteProcess')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentInputModal;