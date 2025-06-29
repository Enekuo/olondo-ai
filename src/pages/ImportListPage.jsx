import React, { useState, useEffect, useCallback } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { useWordList } from '@/contexts/WordListContext';
    import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
    import { parseTextToList, Language } from '@/lib/speechUtils';
    import { manageWordPairLinesInImport, createInitialWordPairs } from '@/lib/wordPairUtils';

    import ImportListPageHeader from '@/components/import-list/ImportListPageHeader';
    import ImportArea from '@/components/import-list/ImportArea';
    import EditableWordPairListImport from '@/components/import-list/EditableWordPairListImport';
    import GlobalControls from '@/components/shared/GlobalControls';
    import SaveListDialog from '@/components/create-list/SaveListDialog';
    import GlobalLoopButton from '@/components/shared/GlobalLoopButton';


    const ImportListPage = () => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const { wordLists, updateWordList, addWordList } = useWordList();
      
      const [currentListName, setCurrentListName] = useState('');
      const [currentWordPairs, setCurrentWordPairs] = useState([]);
      const [activeListId, setActiveListId] = useState(null); 
      const [globalLoopState, setGlobalLoopState] = useState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
      const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);
      const [tempListNameForSave, setTempListNameForSave] = useState('');
      const [viewMode, setViewMode] = useState('import'); 
      const [pastedText, setPastedText] = useState('');

      const { addToQueue, stopSpeech, isSpeaking } = useSpeechSynthesis();

      useEffect(() => {
        return () => {
          if (globalLoopState.timeoutId) clearTimeout(globalLoopState.timeoutId);
          stopSpeech();
        };
      }, [globalLoopState.timeoutId, stopSpeech]);
      
      const processPastedText = (text, sourceName = "Lista Pegada") => {
        const pairs = parseTextToList(text);
        if (pairs.length === 0 && text.trim() !== "") {
            toast({ 
                title: "Error de Formato", 
                description: "No se pudieron encontrar pares válidos. Asegúrate de que cada línea sea 'palabra - traducción' o 'palabra / traducción'.", 
                variant: "destructive",
                duration: 6000 
            });
            setCurrentWordPairs(createInitialWordPairs(2, true)); 
            setCurrentListName('');
            setViewMode('import');
            setPastedText(text); 
        } else if (pairs.length > 0) {
            const newPairs = pairs.map(p => ({...p, id: Date.now() + Math.random(), langWord: Language.Spanish, langTranslation: Language.GoogleUSEnglish, isLooping: false }));
            setCurrentWordPairs(newPairs);
            setCurrentListName(sourceName);
            setActiveListId(null); 
            setViewMode('edit');
            toast({ title: "Lista Procesada", description: `Contenido de "${sourceName}" listo.`, className: "bg-green-500 text-white" });
        } else {
            setCurrentWordPairs([]);
            setCurrentListName('');
            setViewMode('import');
            setPastedText('');
        }
      };

      const handlePastedTextChange = (e) => {
        const text = e.target.value;
        setPastedText(text);
        if (text.trim() !== "") {
            processPastedText(text);
        } else {
            setCurrentWordPairs([]);
            setCurrentListName('');
            setViewMode('import');
        }
      };
      
      const triggerSaveList = () => {
        const nonEmptyPairs = currentWordPairs.filter(pair => pair.word.trim() !== '' && pair.translation.trim() !== '');
        if (nonEmptyPairs.length === 0) {
          toast({ title: "Lista Vacía", description: "Debes tener al menos una palabra y su traducción para guardar.", variant: "destructive" });
          return;
        }
        setTempListNameForSave(currentListName || (activeListId ? wordLists.find(l=>l.id === activeListId)?.name : "Mi Nueva Lista")); 
        setIsSaveAlertOpen(true);
      };

      const confirmSaveList = () => {
        if (!tempListNameForSave.trim()) {
          toast({ title: "Error", description: "Por favor, introduce un nombre para la lista.", variant: "destructive" });
          return;
        }
        const nonEmptyPairs = currentWordPairs.filter(pair => pair.word.trim() !== '' && pair.translation.trim() !== '');
        
        const listToSave = { 
            name: tempListNameForSave, 
            words: nonEmptyPairs.map(p => ({...p, isLooping: false})), 
            source: 'import' 
        };

        if (activeListId) { 
            updateWordList(activeListId, listToSave);
            toast({ title: "Éxito", description: `Lista "${tempListNameForSave}" actualizada.`, className: "bg-green-500 text-white" });
        } else { 
            const newId = Date.now() + Math.random(); 
            addWordList({...listToSave, id: newId});
            toast({ title: "Éxito", description: `Lista "${tempListNameForSave}" guardada.`, className: "bg-green-500 text-white" });
            setActiveListId(newId); 
        }
        setIsSaveAlertOpen(false);
        setTempListNameForSave('');
      };


      const handleInputChange = (index, field, value) => {
        setCurrentWordPairs(prevPairs => manageWordPairLinesInImport(prevPairs, index, field, value, Language.Spanish, Language.GoogleUSEnglish));
      };

      const handleSaveRecording = (index, audioBlob) => {
        const newPairs = [...currentWordPairs];
        newPairs[index].recordedAudio = audioBlob;
        setCurrentWordPairs(newPairs);
        toast({ title: "Grabación Guardada", description: "Tu voz ha sido guardada para esta línea.", className: "bg-green-500 text-white" });
      };
    
      const handleDeleteRecording = (index) => {
        const newPairs = [...currentWordPairs];
        delete newPairs[index].recordedAudio;
        setCurrentWordPairs(newPairs);
        toast({ title: "Grabación Eliminada", description: "La grabación de voz ha sido eliminada.", className: "bg-red-500 text-white" });
      };
    
      const handlePlayRecording = (index) => {
        const pair = currentWordPairs[index];
        if (pair.recordedAudio) {
          const audioURL = URL.createObjectURL(pair.recordedAudio);
          const audio = new Audio(audioURL);
          audio.play().catch(e => console.error("Error playing recording:", e));
          audio.onended = () => URL.revokeObjectURL(audioURL);
        }
      };
      
      const playLoopLogic = useCallback(() => {
        if (!globalLoopState.active || isSpeaking) return;

        const activeLoopingPairs = currentWordPairs.filter(p => p.isLooping && p.word.trim() && p.translation.trim());
        if (activeLoopingPairs.length === 0) {
          setGlobalLoopState(prev => ({ ...prev, active: false, timeoutId: null, currentIndex: -1, currentPart: 'word' }));
          return;
        }
        
        let nextIndex = globalLoopState.currentIndex;
        let nextPart = globalLoopState.currentPart;
        let delay = 150; 

        if (globalLoopState.currentIndex === -1) { 
            nextIndex = 0;
            nextPart = 'word';
        } else if (globalLoopState.currentPart === 'word') {
            nextPart = 'translation';
        } else { 
            nextIndex = (globalLoopState.currentIndex + 1) % activeLoopingPairs.length;
            nextPart = 'word';
            delay = 1000; 
        }
        
        const pairToPlay = activeLoopingPairs[nextIndex];
         if (!pairToPlay) {
             setGlobalLoopState(prev => ({ ...prev, active: false, timeoutId: null, currentIndex: -1, currentPart: 'word' }));
             return;
        }

        const textToSpeak = nextPart === 'word' ? pairToPlay.word : pairToPlay.translation;
        const langToUse = nextPart === 'word' ? Language.Spanish : Language.GoogleUSEnglish;

        addToQueue(textToSpeak, langToUse, () => {
            const timeoutId = setTimeout(() => {
                setGlobalLoopState(prev => ({ ...prev, currentIndex: nextIndex, currentPart: nextPart, timeoutId: null }));
            }, delay); 
            setGlobalLoopState(prev => ({ ...prev, timeoutId }));
        });

      }, [globalLoopState.active, globalLoopState.currentIndex, globalLoopState.currentPart, currentWordPairs, addToQueue, isSpeaking]);

      useEffect(() => {
        if (globalLoopState.active && globalLoopState.timeoutId === null && !isSpeaking) {
          playLoopLogic();
        } else if (!globalLoopState.active) {
          if (globalLoopState.timeoutId) clearTimeout(globalLoopState.timeoutId);
          stopSpeech();
        }
      }, [globalLoopState, playLoopLogic, isSpeaking, stopSpeech]);

      const toggleLoop = (index) => {
        const updatedPairs = [...currentWordPairs];
        const pair = updatedPairs[index];

        if (!pair.word.trim() || !pair.translation.trim()) {
          toast({ title: "Campos Vacíos", description: "La palabra y la traducción son necesarias para el bucle.", variant: "destructive" });
           if (pair.isLooping) { 
             updatedPairs[index].isLooping = false;
             setCurrentWordPairs(updatedPairs);
          }
          return;
        }

        updatedPairs[index].isLooping = !pair.isLooping;
        setCurrentWordPairs(updatedPairs);
        
        const anyLooping = updatedPairs.some(p => p.isLooping);
        if (anyLooping && !globalLoopState.active) {
          setGlobalLoopState({ active: true, currentIndex: -1, currentPart: 'word', timeoutId: null });
        } else if (!anyLooping && globalLoopState.active) {
          const stillLoopingPairs = updatedPairs.filter(p => p.isLooping);
          if (stillLoopingPairs.length === 0) {
            setGlobalLoopState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
          }
        }
      };

      const toggleGlobalLoop = () => {
        const anyValidPair = currentWordPairs.some(p => p.word.trim() && p.translation.trim());
        if (!anyValidPair && !globalLoopState.active) {
            toast({ title: "Lista Vacía", description: "Añade palabras para iniciar el bucle global.", variant: "destructive" });
            return;
        }

        const newGlobalLoopActive = !globalLoopState.active;
        setCurrentWordPairs(prevPairs => 
            prevPairs.map(p => 
                (p.word.trim() && p.translation.trim()) ? { ...p, isLooping: newGlobalLoopActive } : p
            )
        );
        setGlobalLoopState(prev => ({ ...prev, active: newGlobalLoopActive, currentIndex: -1, currentPart: 'word', timeoutId: null }));
      };
      
      const isAnythingLooping = currentWordPairs.some(p => p.isLooping);
      
      let pageTitle = 'Copiar Lista o archivo';
      if (viewMode === 'edit' && currentListName) pageTitle = currentListName;

      return (
        <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto p-2 sm:p-4 md:p-6 my-4 sm:my-6 rounded-xl shadow-2xl bg-card/80 backdrop-blur-sm border border-primary/30 flex flex-col h-full"
        >
          <ImportListPageHeader 
            pageTitle={pageTitle}
            onBack={() => viewMode === 'import' ? navigate('/options') : setViewMode('import')}
            backButtonText={viewMode === 'import' ? 'Volver' : 'Atrás a Importar'}
            isEditing={viewMode === 'edit'}
          />

          {viewMode === 'import' && (
            <ImportArea
              pastedText={pastedText}
              onPastedTextChange={handlePastedTextChange}
              onTextImport={processPastedText}
            />
          )}
          
          {viewMode === 'edit' && (
            <div className="flex flex-col flex-grow h-full">
               <div className="mb-4">
                <GlobalLoopButton
                    onToggleGlobalLoop={toggleGlobalLoop}
                    isGlobalLoopActive={globalLoopState.active}
                />
               </div>
              <EditableWordPairListImport
                wordPairs={currentWordPairs}
                onInputChange={handleInputChange}
                onToggleLoop={toggleLoop}
                onSaveRecording={handleSaveRecording}
                onDeleteRecording={handleDeleteRecording}
                onPlayRecording={handlePlayRecording}
              />
            </div>
          )}
          <GlobalControls
            hasContent={currentWordPairs.some(p => p.word.trim() !== '' || p.translation.trim() !== '')}
            onSave={triggerSaveList}
            isSavedList={!!activeListId}
            alwaysShowSaveButton={true}
            pageContext="importList"
          />
        </motion.div>

        <SaveListDialog
          isOpen={isSaveAlertOpen}
          onOpenChange={setIsSaveAlertOpen}
          listName={tempListNameForSave}
          onListNameChange={setTempListNameForSave}
          onConfirm={confirmSaveList}
          dialogTitle={activeListId ? "Actualizar Nombre de Lista" : "Guardar Nueva Lista"}
          descriptionText={activeListId ? "Edita el nombre de tu lista." : "Introduce un nombre para tu nueva lista."}
        />
        </>
      );
    };

    export default ImportListPage;