import React from 'react';
    import { Input } from '@/components/ui/input';
    import WordPairRow from '@/components/import-list/WordPairRow';

    const WordPairList = ({ listName, onListNameChange, wordPairs, onInputChange, onToggleLoop }) => {
      return (
        <div className="flex flex-col flex-grow h-full">
          <Input 
            placeholder="Nombre de la lista" 
            value={listName}
            onChange={(e) => onListNameChange(e.target.value)}
            className="mb-4 bg-input border-primary/50 focus:border-primary focus:ring-primary text-sm text-white placeholder-slate-400"
          />
          <div className="flex-grow overflow-y-auto no-scrollbar scrollable-content" style={{ maxHeight: 'calc(100% - 100px)' }}>
            {wordPairs.map((pair, index) => (
              <WordPairRow
                key={pair.id}
                pair={pair}
                index={index}
                onInputChange={onInputChange}
                onToggleLoop={onToggleLoop}
              />
            ))}
          </div>
        </div>
      );
    };

    export default WordPairList;