import React from 'react';
    import WordPairRow from '@/components/create-list/WordPairRow';

    const EditableWordPairList = ({ wordPairs, onInputChange, onToggleLoop, onSaveRecording, onDeleteRecording, onPlayRecording }) => {
      return (
        <>
          <div className="flex-grow overflow-y-auto no-scrollbar scrollable-content" style={{ maxHeight: 'calc(100% - 150px)' }}>
            {wordPairs.map((pair, index) => (
              <WordPairRow
                key={pair.id}
                pair={pair}
                index={index}
                onInputChange={onInputChange}
                onToggleLoop={onToggleLoop}
                onSaveRecording={onSaveRecording}
                onDeleteRecording={onDeleteRecording}
                onPlayRecording={onPlayRecording}
              />
            ))}
          </div>
        </>
      );
    };

    export default EditableWordPairList;