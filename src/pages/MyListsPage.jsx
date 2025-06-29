import React, { useState, useEffect, useCallback } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { useWordList } from '@/contexts/WordListContext';
    import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
    import { Language } from '@/lib/speechUtils';
    import MyListsPageHeader from '@/components/my-lists/MyListsPageHeader';
    import SavedListsDisplay from '@/components/import-list/SavedListsDisplay';
    import EditableWordPairList from '@/components/my-lists/EditableWordPairList';
    import GlobalControls from '@/components/shared/GlobalControls';
    import SaveListDialog from '@/components/create-list/SaveListDialog';
    import GlobalLoopButton from '@/components/shared/GlobalLoopButton';

    const MyListsPage = () => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const { wordLists, deleteWordList, updateWordList } = useWordList();
      
      const [currentListName, setCurrentListName] = useState('');
      const [currentWordPairs, setCurrentWordPairs] = useState([]);
      const [activeListId, setActiveListId] = useState(null);
      const [globalLoopState, setGlobalLoopState] = useState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
      const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);
      const [tempListNameForSave, setTempListNameForSave] = useState('');
      const [viewMode, setViewMode] = useState('select'); 

      const { addToQueue, stopSpeech, isSpeaking } = useSpeechSynthesis();

      useEffect(() => {
        return () => {
          if (globalLoopState.timeoutId) clearTimeout(globalLoopState.timeoutId);
          stopSpeech();
        };
      }, [globalLoopState.timeoutId, stopSpeech]);

      const resetToSelectMode = () => {
        setActiveListId(null);
        setCurrentListName('');
        setCurrentWordPairs([]);
        setGlobalLoopState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
        setViewMode('select');
      };

      const loadList = (listIdToLoad) => {
        const listToLoad = wordLists.find(l => l.id === listIdToLoad);
        if (listToLoad) {
          setActiveListId(listIdToLoad);
          setCurrentListName(listToLoad.name);
          let loadedPairs = listToLoad.words.map(p => ({
            ...p, 
            id: p.id || Date.now() + Math.random(), 
            langWord: Language.Spanish, 
            langTranslation: Language.GoogleUSEnglish, 
            isLooping: false,
            recordedAudio: p.recordedAudio || null 
          }));
          
          if (loadedPairs.length === 0 || (loadedPairs[loadedPairs.length -1].word.trim() !== '' || loadedPairs[loadedPairs.length -1].translation.trim() !== '')) {
            loadedPairs.push({ id: Date.now() + Math.random(), word: '', translation: '', langWord: Language.Spanish, langTranslation: Language.GoogleUSEnglish, isLooping: false, recordedAudio: null });
          }

          setCurrentWordPairs(loadedPairs);
          setViewMode('edit');
          setGlobalLoopState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
          toast({ title: "Lista Cargada", description: `"${listToLoad.name}" está lista para usar.`, className: "bg-green-500 text-white"});
        }
      };

      const handleDeleteList = (listIdToDelete) => {
        const listName = wordLists.find(l => l.id === listIdToDelete)?.name || "esta lista";
        deleteWordList(listIdToDelete);
        if (activeListId === listIdToDelete) {
          resetToSelectMode();
        }
        toast({ title: "Lista Eliminada", description: `"${listName}" ha sido eliminada.`, className:"bg-red-500 text-white" });
      };

      const handleInputChange = (index, field, value) => {
        const newPairs = [...currentWordPairs];
        newPairs[index][field] = value;
        newPairs[index].langWord = Language.Spanish;
        newPairs[index].langTranslation = Language.GoogleUSEnglish;
        
        if (index === newPairs.length - 1 && (newPairs[index].word.trim() !== '' || newPairs[index].translation.trim() !== '')) {
          newPairs.push({ id: Date.now() + Math.random(), word: '', translation: '', langWord: Language.Spanish, langTranslation: Language.GoogleUSEnglish, isLooping: false, recordedAudio: null });
        }
        
        if (newPairs.length > 1 && index < newPairs.length - 1 && newPairs[index].word.trim() === '' && newPairs[index].translation.trim() === '' && index !== newPairs.length -1) {
           if (newPairs[newPairs.length -1].word.trim() === '' && newPairs[newPairs.length -1].translation.trim() === '') {
             newPairs.splice(index, 1);
           }
        }
        setCurrentWordPairs(newPairs);
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

      const triggerSaveList = () => {
        const nonEmptyPairs = currentWordPairs.filter(pair => pair.word.trim() !== '' && pair.translation.trim() !== '');
        if (nonEmptyPairs.length === 0) {
          toast({ title: "Error", description: "La lista no puede estar vacía.", variant: "destructive" });
          return;
        }
        setTempListNameForSave(currentListName);
        setIsSaveAlertOpen(true);
      };

      const confirmSaveList = () => {
        if (!tempListNameForSave.trim()) {
          toast({ title: "Error", description: "Por favor, introduce un nombre para la lista.", variant: "destructive" });
          return;
        }
        const nonEmptyPairs = currentWordPairs.filter(pair => pair.word.trim() !== '' && pair.translation.trim() !== '');
        updateWordList(activeListId, { name: tempListNameForSave, words: nonEmptyPairs.map(p => ({...p, isLooping: false})) });
        toast({ title: "Éxito", description: `Lista "${tempListNameForSave}" actualizada.`, className: "bg-green-500 text-white" });
        setIsSaveAlertOpen(false);
        loadList(activeListId); 
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
      const hasContentToSave = currentWordPairs.some(p => p.word.trim() !== '' || p.translation.trim() !== '');
      
      let pageTitle = 'Mis Listas';
      if (viewMode === 'edit' && currentListName) pageTitle = currentListName;

      return (
        <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto p-2 sm:p-4 md:p-6 my-4 sm:my-6 rounded-xl shadow-2xl bg-card/80 backdrop-blur-sm border border-primary/30 flex flex-col h-full"
        >
          <MyListsPageHeader 
            title={pageTitle}
            onBack={() => viewMode === 'select' ? navigate('/options') : resetToSelectMode()}
            backButtonText={viewMode === 'select' ? 'Volver' : 'Atrás a Mis Listas'}
            isEditing={viewMode === 'edit'}
          />

          {viewMode === 'select' && (
            <div className="flex flex-col items-center justify-center flex-grow">
              <SavedListsDisplay 
                wordLists={wordLists}
                activeListId={activeListId}
                onLoadList={loadList}
                onDeleteList={handleDeleteList}
                emptyMessage="Aún no has guardado ninguna lista."
              />
            </div>
          )}
          
          {viewMode === 'edit' && (
            <div className="flex flex-col flex-grow h-full">
               <div className="mb-4">
                <GlobalLoopButton
                    onToggleGlobalLoop={toggleGlobalLoop}
                    isGlobalLoopActive={globalLoopState.active}
                />
               </div>
              <EditableWordPairList
                wordPairs={currentWordPairs}
                onInputChange={handleInputChange}
                onToggleLoop={toggleLoop}
                onSaveRecording={handleSaveRecording}
                onDeleteRecording={handleDeleteRecording}
                onPlayRecording={handlePlayRecording}
              />
              <GlobalControls
                hasContent={currentWordPairs.some(p => p.word.trim() !== '' || p.translation.trim() !== '')}
                onSave={triggerSaveList}
                isSavedList={true}
                alwaysShowSaveButton={true}
                pageContext="myLists"
              />
            </div>
          )}
        </motion.div>

        <SaveListDialog
          isOpen={isSaveAlertOpen}
          onOpenChange={setIsSaveAlertOpen}
          listName={tempListNameForSave}
          onListNameChange={setTempListNameForSave}
          onConfirm={confirmSaveList}
          dialogTitle="Actualizar Nombre de Lista"
          descriptionText="Edita el nombre de tu lista."
        />
        </>
      );
    };

    export default MyListsPage;