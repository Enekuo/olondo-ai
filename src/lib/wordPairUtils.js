import { Language } from '@/lib/speechUtils';

    export const createInitialWordPairs = (count = 2, forImport = false) => {
      return Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i + Math.random(),
        word: '',
        translation: '',
        langWord: Language.Spanish,
        langTranslation: forImport ? Language.GoogleUSEnglish : Language.English,
        isLooping: false,
      }));
    };

    export const manageWordPairLines = (pairs, index, field, value, source = 'create') => {
      const newPairs = [...pairs];
      newPairs[index][field] = value;
      newPairs[index].langWord = Language.Spanish;
      newPairs[index].langTranslation = source === 'import' ? Language.GoogleUSEnglish : Language.English;

      if (index === newPairs.length - 1 && (newPairs[index].word.trim() !== '' || newPairs[index].translation.trim() !== '')) {
        newPairs.push({
          id: Date.now() + Math.random(),
          word: '',
          translation: '',
          langWord: Language.Spanish,
          langTranslation: source === 'import' ? Language.GoogleUSEnglish : Language.English,
          isLooping: false,
        });
      }

      if (newPairs.length > 1 && index < newPairs.length -1 && newPairs[index].word.trim() === '' && newPairs[index].translation.trim() === '' && index !== newPairs.length -1) {
        if (newPairs[newPairs.length -1].word.trim() === '' && newPairs[newPairs.length -1].translation.trim() === '') {
          newPairs.splice(index, 1);
        }
      }
      return newPairs;
    };
    
    export const manageWordPairLinesInImport = (pairs, index, field, value) => {
        return manageWordPairLines(pairs, index, field, value, 'import');
    };