import React, { useState, useRef, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Mic, Play, StopCircle, Trash2, CheckCircle, XCircle, Repeat, Repeat1 } from 'lucide-react';
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
    import { useToast } from '@/components/ui/use-toast';

    const PredefinedWordPairRow = ({ pair, index, onToggleLoop, onInputChange, onSaveRecording, onDeleteRecording, onPlayRecording }) => {
      const { toast } = useToast();
      const [isRecording, setIsRecording] = useState(false);
      const [audioBlob, setAudioBlob] = useState(pair.recordedAudio || null);
      const [showConfirmDialog, setShowConfirmDialog] = useState(false);
      const [isPlayingRecordedAudioLoop, setIsPlayingRecordedAudioLoop] = useState(false);
      const mediaRecorderRef = useRef(null);
      const audioChunksRef = useRef([]);
      const recordedAudioRef = useRef(null);

      useEffect(() => {
        setAudioBlob(pair.recordedAudio || null);
      }, [pair.recordedAudio]);

      useEffect(() => {
        if (recordedAudioRef.current) {
          recordedAudioRef.current.loop = isPlayingRecordedAudioLoop;
          if (isPlayingRecordedAudioLoop && recordedAudioRef.current.paused) {
            recordedAudioRef.current.play().catch(e => console.error("Error playing recorded audio loop:", e));
          } else if (!isPlayingRecordedAudioLoop && !recordedAudioRef.current.paused) {
            recordedAudioRef.current.pause();
            recordedAudioRef.current.currentTime = 0;
          }
        }
         return () => {
          if (recordedAudioRef.current && !recordedAudioRef.current.paused) {
            recordedAudioRef.current.pause();
            recordedAudioRef.current.currentTime = 0;
          }
        };
      }, [isPlayingRecordedAudioLoop]);

      const startRecording = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorderRef.current = new MediaRecorder(stream);
          audioChunksRef.current = [];

          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };

          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            setAudioBlob(blob);
            setShowConfirmDialog(true);
            stream.getTracks().forEach(track => track.stop());
          };

          mediaRecorderRef.current.start();
          setIsRecording(true);
          toast({ title: "Grabando...", description: "Pulsa de nuevo para detener.", className: "bg-blue-500 text-white" });
        } catch (error) {
          console.error("Error starting recording:", error);
          toast({ title: "Error de Grabación", description: "No se pudo iniciar la grabación. Revisa los permisos del micrófono.", variant: "destructive" });
          setIsRecording(false);
        }
      };

      const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      };

      const handleRecordButtonClick = () => {
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      };

      const handleConfirmSaveRecording = () => {
        if (audioBlob) {
          onSaveRecording(index, audioBlob);
        }
        setShowConfirmDialog(false);
      };

      const handleCancelSaveRecording = () => {
        setAudioBlob(null);
        setShowConfirmDialog(false);
      };
      
      const handleDeleteRecordedAudio = () => {
        if (isPlayingRecordedAudioLoop) {
          setIsPlayingRecordedAudioLoop(false);
        }
        if (recordedAudioRef.current) {
            recordedAudioRef.current.pause();
            recordedAudioRef.current.src = ''; 
        }
        onDeleteRecording(index);
        setAudioBlob(null);
      };

      const handlePlayRecordedAudio = () => {
        if (pair.recordedAudio) {
          if (recordedAudioRef.current && !recordedAudioRef.current.paused && isPlayingRecordedAudioLoop) {
            setIsPlayingRecordedAudioLoop(false); 
          } else {
            if (!recordedAudioRef.current || recordedAudioRef.current.src !== URL.createObjectURL(pair.recordedAudio)) {
              const audioURL = URL.createObjectURL(pair.recordedAudio);
              recordedAudioRef.current = new Audio(audioURL);
               recordedAudioRef.current.onended = () => {
                if (!isPlayingRecordedAudioLoop) {
                    URL.revokeObjectURL(audioURL);
                }
              };
            }
            setIsPlayingRecordedAudioLoop(true);
          }
        }
      };

      return (
        <>
          <motion.div
            key={pair.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10}}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 bg-secondary/30 rounded-lg border border-primary/20 mb-2"
          >
            <Input
              placeholder="Palabra"
              value={pair.word}
              onChange={(e) => onInputChange(index, 'word', e.target.value)}
              className="flex-grow bg-input border-primary/40 focus:border-primary focus:ring-primary text-xs sm:text-sm text-white placeholder-slate-400 h-8 sm:h-9 px-1.5 py-0.5"
            />
            <Input
              placeholder="Traducción"
              value={pair.translation}
              onChange={(e) => onInputChange(index, 'translation', e.target.value)}
              className="flex-grow bg-input border-primary/40 focus:border-primary focus:ring-primary text-xs sm:text-sm text-white placeholder-slate-400 h-8 sm:h-9 px-1.5 py-0.5"
            />
            <Button
              variant={pair.isLooping ? "default" : "outline"}
              size="icon"
              onClick={() => onToggleLoop(index)}
              className={`p-1 h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-xs ${pair.isLooping ? 'bg-primary text-white hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary/10'}`}
              aria-label={pair.isLooping ? 'Parar bucle' : 'Iniciar bucle'}
            >
              <span className="hidden sm:inline">Bucle</span>
              <span className="sm:hidden">B</span>
            </Button>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              onClick={handleRecordButtonClick}
              className={`p-1 h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-xs ${isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'border-blue-500 text-blue-500 hover:bg-blue-500/10'}`}
              aria-label={isRecording ? 'Detener grabación' : 'Grabar voz'}
            >
              {isRecording ? <StopCircle size={16} /> : <Mic size={16} />}
            </Button>
            {audioBlob && (
              <>
                <Button
                  variant={isPlayingRecordedAudioLoop ? "secondary" : "outline"}
                  size="icon"
                  onClick={handlePlayRecordedAudio}
                  className={`p-1 h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-xs ${isPlayingRecordedAudioLoop ? 'bg-green-700 text-white hover:bg-green-800' : 'border-green-500 text-green-500 hover:bg-green-500/10'}`}
                  aria-label={isPlayingRecordedAudioLoop ? "Detener grabación en bucle" : "Reproducir grabación en bucle"}
                >
                  {isPlayingRecordedAudioLoop ? <Repeat1 size={16} /> : <Play size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDeleteRecordedAudio}
                  className="p-1 h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-red-500 hover:bg-red-500/10"
                  aria-label="Eliminar grabación"
                >
                  <Trash2 size={16} />
                </Button>
              </>
            )}
          </motion.div>

          <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Grabación</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Quieres guardar esta grabación o eliminarla?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancelSaveRecording} className="flex items-center">
                  <XCircle className="mr-2 h-4 w-4" /> Eliminar
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmSaveRecording} className="flex items-center bg-green-500 hover:bg-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" /> Aceptar y Guardar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    };

    export default PredefinedWordPairRow;