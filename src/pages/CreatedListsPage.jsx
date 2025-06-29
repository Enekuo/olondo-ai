import React, { useState, useEffect, useCallback } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { useWordList } from '@/contexts/WordListContext';
    import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
    import { Language } from '@/lib/speechUtils';
    import { getPredefinedListsData } from '@/lib/predefinedListsData';
    import { getCategoryIcon } from '@/lib/categoryUtils';
    import CreatedListsPageHeader from '@/components/created-lists/CreatedListsPageHeader';
    import CategoryList from '@/components/created-lists/CategoryList';
    import ListDisplay from '@/components/created-lists/ListDisplay';
    import PredefinedWordPairList from '@/components/created-lists/PredefinedWordPairList';
    import GlobalLoopButton from '@/components/shared/GlobalLoopButton';

    const CreatedListsPage = () => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const { addWordList } = useWordList();
      const [view, setView] = useState('categories'); 
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [selectedList, setSelectedList] = useState(null);
      const [currentWordPairs, setCurrentWordPairs] = useState([]);
      const [globalLoopState, setGlobalLoopState] = useState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
      const [predefinedLists, setPredefinedLists] = useState({});
      const [openCategories, setOpenCategories] = useState({});

      const { addToQueue, stopSpeech, isSpeaking } = useSpeechSynthesis();

      useEffect(() => {
        setPredefinedLists(getPredefinedListsData());
      }, []);

      useEffect(() => {
        return () => {
          if (globalLoopState.timeoutId) clearTimeout(globalLoopState.timeoutId);
          stopSpeech();
        };
      }, [globalLoopState.timeoutId, stopSpeech]);

      const handleToggleCategory = (categoryKey) => {
        setOpenCategories(prev => ({
          ...prev,
          [categoryKey]: !prev[categoryKey]
        }));
        if (!openCategories[categoryKey]) {
            setSelectedCategory(predefinedLists[categoryKey]);
            setView('lists'); 
        } else {
            setView('categories');
            setSelectedCategory(null);
        }
      };

      const handleSelectCategory = (categoryKey) => {
        setSelectedCategory(predefinedLists[categoryKey]);
        setView('lists');
        setOpenCategories(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({...acc, [key]: false}), {}), [categoryKey]: true }));
      };


      const handleSelectList = (listKey) => {
        const listData = selectedCategory.lists[listKey];
        if (listData) {
          setSelectedList(listData);
          setCurrentWordPairs(listData.words.map(p => ({ ...p, id: Date.now() + Math.random(), langWord: Language.Spanish, langTranslation: Language.GoogleUSEnglish, isLooping: false, recordedAudio: null })));
          setView('words');
          setGlobalLoopState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
        }
      };

      const handleSaveListToMyLists = () => {
        if (selectedList && currentWordPairs.length > 0) {
          const listToSave = {
            id: Date.now(),
            name: selectedList.name,
            words: currentWordPairs.map(p => ({ word: p.word, translation: p.translation, recordedAudio: p.recordedAudio || null })),
            source: 'predefined'
          };
          addWordList(listToSave);
          toast({
            title: "Lista Guardada",
            description: `"${selectedList.name}" ha sido añadida a Mis Listas.`,
            className: "bg-green-500 text-white"
          });
          navigate('/my-lists');
        }
      };

      const handleInputChange = (index, field, value) => {
        const newPairs = [...currentWordPairs];
        newPairs[index][field] = value;
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

      const handleBack = () => {
        if (view === 'words') {
          setView('lists');
          setSelectedList(null);
          setCurrentWordPairs([]);
          setGlobalLoopState({ active: false, currentIndex: -1, currentPart: 'word', timeoutId: null });
          const openCategoryKey = Object.keys(openCategories).find(key => openCategories[key]);
          if (openCategoryKey) {
            setSelectedCategory(predefinedLists[openCategoryKey]);
          } else {
            setView('categories');
            setSelectedCategory(null);
          }

        } else if (view === 'lists') {
          setView('categories');
          setSelectedCategory(null);
          setOpenCategories({});
        } else {
          navigate('/options');
        }
      };

      let title = "Listas Creadas";
      if (view === 'lists' && selectedCategory) title = selectedCategory.name;
      if (view === 'words' && selectedList) title = selectedList.name;

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto p-2 sm:p-4 md:p-6 my-4 sm:my-6 rounded-xl shadow-2xl bg-card/80 backdrop-blur-sm border border-primary/30 flex flex-col h-full"
        >
          <CreatedListsPageHeader title={title} onBack={handleBack} />
          
          {view === 'categories' && (
            <CategoryList 
                categories={predefinedLists} 
                onSelectCategory={handleSelectCategory} 
                getCategoryIcon={getCategoryIcon}
                onSelectList={handleSelectList}
                openCategories={openCategories}
                onToggleCategory={handleToggleCategory}
            />
          )}

          {view === 'lists' && selectedCategory && !selectedList && (
            <ListDisplay category={selectedCategory} onSelectList={handleSelectList} />
          )}

          {view === 'words' && selectedList && (
            <div className="flex flex-col flex-grow h-full">
              <div className="mb-4">
                <GlobalLoopButton
                    onToggleGlobalLoop={toggleGlobalLoop}
                    isGlobalLoopActive={globalLoopState.active}
                />
              </div>
              <PredefinedWordPairList
                wordPairs={currentWordPairs}
                onToggleLoop={toggleLoop}
                onSaveList={handleSaveListToMyLists}
                onInputChange={handleInputChange}
                onSaveRecording={handleSaveRecording}
                onDeleteRecording={handleDeleteRecording}
                onPlayRecording={handlePlayRecording}
              />
            </div>
          )}
        </motion.div>
      );
    };

    export default CreatedListsPage;