import React from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Repeat } from 'lucide-react';

    const WordPairList = ({ wordPairs, onInputChange, onToggleLoop, showRemoveButton = true }) => {
      if (!wordPairs || wordPairs.length === 0) return null;

      return (
        <div className="space-y-2 sm:space-y-2.5 mb-4 max-h-[45vh] overflow-y-auto pr-1 sm:pr-2">
          {wordPairs.map((pair, index) => (
            <motion.div
              key={pair.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10}}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-1.5 p-2 bg-secondary/30 rounded-lg border border-primary/20"
            >
              <Input
                value={pair.word}
                onChange={(e) => onInputChange(index, 'word', e.target.value)}
                className="flex-1 bg-input border-primary/40 focus:border-primary focus:ring-primary text-base sm:text-sm text-white placeholder-slate-400 h-12 sm:h-9"
                placeholder="Palabra"
              />
              <Input
                value={pair.translation}
                onChange={(e) => onInputChange(index, 'translation', e.target.value)}
                className="flex-1 bg-input border-primary/40 focus:border-primary focus:ring-primary text-base sm:text-sm text-white placeholder-slate-400 h-12 sm:h-9"
                placeholder="Traducción"
              />
              <Button
                variant={pair.isLooping ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleLoop(index)}
                className={`w-full sm:w-24 text-xs py-2 sm:py-1 ${pair.isLooping ? 'bg-primary text-white hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary/10 hover:text-primary'}`}
              >
                <Repeat size={12} className="mr-1 sm:mr-1.5"/> {pair.isLooping ? 'Parar' : 'Bucle'}
              </Button>
            </motion.div>
          ))}
        </div>
      );
    };

    export default WordPairList;