import React, { createContext, useContext, useState, useEffect } from 'react';

    const WordListContext = createContext();

    export const useWordList = () => useContext(WordListContext);

    export const WordListProvider = ({ children }) => {
      const [wordLists, setWordLists] = useState(() => {
        const localData = localStorage.getItem('wordLists');
        return localData ? JSON.parse(localData) : [];
      });

      useEffect(() => {
        localStorage.setItem('wordLists', JSON.stringify(wordLists));
      }, [wordLists]);

      const addWordList = (newList) => {
        setWordLists((prevLists) => [...prevLists, { ...newList, id: Date.now() }]);
      };

      const deleteWordList = (listId) => {
        setWordLists((prevLists) => prevLists.filter(list => list.id !== listId));
      };
      
      const updateWordList = (listId, updatedProperties) => {
        setWordLists((prevLists) => 
          prevLists.map(list => 
            list.id === listId ? { ...list, ...updatedProperties } : list
          )
        );
      };

      return (
        <WordListContext.Provider value={{ wordLists, addWordList, deleteWordList, updateWordList }}>
          {children}
        </WordListContext.Provider>
      );
    };