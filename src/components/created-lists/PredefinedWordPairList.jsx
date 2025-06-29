import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Save } from 'lucide-react';
    import PredefinedWordPairRow from '@/components/created-lists/PredefinedWordPairRow';

    const PredefinedWordPairList = ({ wordPairs, onToggleLoop, onSaveList, onInputChange, onSaveRecording, onDeleteRecording, onPlayRecording }) => {
      return (
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto no-scrollbar scrollable-content" style={{ maxHeight: 'calc(100% - 150px)' }}>
            {wordPairs.map((pair, index) => (
              <PredefinedWordPairRow
                key={pair.id}
                pair={pair}
                index={index}
                onToggleLoop={onToggleLoop}
                onInputChange={onInputChange}
                onSaveRecording={onSaveRecording}
                onDeleteRecording={onDeleteRecording}
                onPlayRecording={onPlayRecording}
              />
            ))}
          </div>
          <div className="mt-auto pt-4 pb-2 sticky bottom-0 bg-card/80 backdrop-blur-sm z-10 border-t border-primary/30">
            <div className="flex justify-center">
              <Button
                onClick={onSaveList}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white text-base font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-150 ease-in-out transform active:scale-95 w-full max-w-xs"
              >
                <Save size={20} />
                <span>Guardar en Mis Listas</span>
              </Button>
            </div>
          </div>
        </div>
      );
    };

    export default PredefinedWordPairList;