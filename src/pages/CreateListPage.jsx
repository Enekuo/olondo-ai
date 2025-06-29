import React, { useState, useEffect, useCallback } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { useWordList } from '@/contexts/WordListContext';
    import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
    import { Language } from '@/lib/speechUtils';
    import { manageWordPairLines, createInitialWordPairs } from '@/lib/wordPairUtils';
    import CreateListPageHeader from '@/components/create-list/CreateListPageHeader';
    import WordListContainer from '@/components/create-list/WordListContainer';
    import GlobalControls from '@/components/shared/GlobalControls';
    import SaveListDialog from '@/components/create-list/SaveListDialog';
    import GlobalLoopButton from '@/components/shared/GlobalLoopButton';

    const CreateListPage = () => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const { addWordList } = useWordList();
      const [listName, setListName] = useState('');
      const [wordPairs, setWordPairs] = useState(createInitialWordPairs(5));
      const [globalLoopState, setGlobalLoopState] = useState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
      const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);
      const [tempListNameForSave, setTempListNameForSave] = useState('');

      const { addToQueue, stopSpeech, isSpeaking } = useSpeechSynthesis();

      useEffect(() => {
        return () => {
          if (globalLoopState.timeoutId) clearTimeout(globalLoopState.timeoutId);
          stopSpeech();
        };
      }, [globalLoopState.timeoutId, stopSpeech]);

      const handleInputChange = (index, field, value) => {
        setWordPairs(prevPairs => manageWordPairLines(prevPairs, index, field, value, Language.Spanish, Language.GoogleUSEnglish));
      };

      const handleSaveRecording = (index, audioBlob) => {
        const newPairs = [...wordPairs];
        newPairs[index].recordedAudio = audioBlob;
        setWordPairs(newPairs);
        toast({ title: "Grabación Guardada", description: "Tu voz ha sido guardada para esta línea.", className: "bg-green-500 text-white" });
      };
    
      const handleDeleteRecording = (index) => {
        const newPairs = [...wordPairs];
        delete newPairs[index].recordedAudio;
        setWordPairs(newPairs);
        toast({ title: "Grabación Eliminada", description: "La grabación de voz ha sido eliminada.", className: "bg-red-500 text-white" });
      };
    
      const handlePlayRecording = (index) => {
        const pair = wordPairs[index];
        if (pair.recordedAudio) {
          const audioURL = URL.createObjectURL(pair.recordedAudio);
          const audio = new Audio(audioURL);
          audio.play().catch(e => console.error("Error playing recording:", e));
          audio.onended = () => URL.revokeObjectURL(audioURL);
        }
      };

      const triggerSaveList = () => {
        const nonEmptyPairs = wordPairs.filter(pair => pair.word.trim() !== '' && pair.translation.trim() !== '');
        if (nonEmptyPairs.length === 0) {
          toast({ title: "Lista Vacía", description: "Debes tener al menos una palabra y su traducción para guardar.", variant: "destructive" });
          return;
        }
        setTempListNameForSave(listName || "Mi Nueva Lista");
        setIsSaveAlertOpen(true);
      };

      const confirmSaveList = () => {
        if (!tempListNameForSave.trim()) {
          toast({ title: "Error", description: "Por favor, introduce un nombre para la lista.", variant: "destructive" });
          return;
        }
        const nonEmptyPairs = wordPairs.filter(pair => pair.word.trim() !== '' && pair.translation.trim() !== '');
        addWordList({ id: Date.now(), name: tempListNameForSave, words: nonEmptyPairs.map(p => ({...p, isLooping: false})), source: 'user' });
        toast({ title: "Éxito", description: `Lista "${tempListNameForSave}" guardada.`, className: "bg-green-500 text-white" });
        setIsSaveAlertOpen(false);
        setListName('');
        setWordPairs(createInitialWordPairs(5));
        navigate('/my-lists');
      };

      const playLoopLogic = useCallback(() => {
        if (!globalLoopState.active || isSpeaking) return;

        const activeLoopingPairs = wordPairs.filter(p => p.isLooping && p.word.trim() && p.translation.trim());
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

      }, [globalLoopState.active, globalLoopState.currentIndex, globalLoopState.currentPart, wordPairs, addToQueue, isSpeaking]);

      useEffect(() => {
        if (globalLoopState.active && globalLoopState.timeoutId === null && !isSpeaking) {
          playLoopLogic();
        } else if (!globalLoopState.active) {
          if (globalLoopState.timeoutId) clearTimeout(globalLoopState.timeoutId);
          stopSpeech();
        }
      }, [globalLoopState, playLoopLogic, isSpeaking, stopSpeech]);

      const toggleLoop = (index) => {
        const updatedPairs = [...wordPairs];
        const pair = updatedPairs[index];

        if (!pair.word.trim() || !pair.translation.trim()) {
          toast({ title: "Campos Vacíos", description: "La palabra y la traducción son necesarias para el bucle.", variant: "destructive" });
           if (pair.isLooping) { 
             updatedPairs[index].isLooping = false;
             setWordPairs(updatedPairs);
          }
          return;
        }

        updatedPairs[index].isLooping = !pair.isLooping;
        setWordPairs(updatedPairs);
        
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
        const anyValidPair = wordPairs.some(p => p.word.trim() && p.translation.trim());
        if (!anyValidPair && !globalLoopState.active) {
            toast({ title: "Lista Vacía", description: "Añade palabras para iniciar el bucle global.", variant: "destructive" });
            return;
        }

        const newGlobalLoopActive = !globalLoopState.active;
        setWordPairs(prevPairs => 
            prevPairs.map(p => 
                (p.word.trim() && p.translation.trim()) ? { ...p, isLooping: newGlobalLoopActive } : p
            )
        );
        setGlobalLoopState(prev => ({ ...prev, active: newGlobalLoopActive, currentIndex: -1, currentPart: 'word', timeoutId: null }));
      };
      
      const isAnythingLooping = wordPairs.some(p => p.isLooping);
      const hasContentToSave = wordPairs.some(p => p.word.trim() !== '' || p.translation.trim() !== '');

      return (
        <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto p-2 sm:p-4 md:p-6 my-4 sm:my-6 rounded-xl shadow-2xl bg-card/80 backdrop-blur-sm border border-primary/30 flex flex-col h-full"
        >
          <CreateListPageHeader onBack={() => navigate('/options')} />
          <div className="mb-4">
            <GlobalLoopButton
                onToggleGlobalLoop={toggleGlobalLoop}
                isGlobalLoopActive={globalLoopState.active}
            />
          </div>
          <WordListContainer
            wordPairs={wordPairs}
            onInputChange={handleInputChange}
            onToggleLoop={toggleLoop}
            onSaveRecording={handleSaveRecording}
            onDeleteRecording={handleDeleteRecording}
            onPlayRecording={handlePlayRecording}
          />
          <GlobalControls
            hasContent={hasContentToSave}
            onSave={triggerSaveList}
            isSavedList={false}
            alwaysShowSaveButton={true}
            pageContext="createList"
          />
        </motion.div>
        <SaveListDialog
          isOpen={isSaveAlertOpen}
          onOpenChange={setIsSaveAlertOpen}
          listName={tempListNameForSave}
          onListNameChange={setTempListNameForSave}
          onConfirm={confirmSaveList}
          dialogTitle="Guardar Nueva Lista"
          descriptionText="Introduce un nombre para tu nueva lista."
        />
        </>
      );
    };

    export default CreateListPage;