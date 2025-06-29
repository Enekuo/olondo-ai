import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ChevronDown, ChevronRight } from 'lucide-react';

    const CategoryList = ({ categories, getCategoryIcon, onSelectList, openCategories, onToggleCategory }) => {
      if (!categories || Object.keys(categories).length === 0) {
        return <p className="text-center text-slate-400">No hay categorías disponibles.</p>;
      }

      return (
        <div className="space-y-3">
          {Object.keys(categories).map(categoryKey => (
            <motion.div key={categoryKey} layout>
              <Button
                variant="outline"
                className="w-full justify-between text-left py-3 px-4 text-base sm:text-lg border-primary/50 hover:bg-primary/10"
                onClick={() => onToggleCategory(categoryKey)}
              >
                <div className="flex items-center">
                  {getCategoryIcon(categoryKey)}
                  {categories[categoryKey].name}
                </div>
                {openCategories[categoryKey] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </Button>
              {openCategories[categoryKey] && categories[categoryKey] && categories[categoryKey].lists && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-4 pt-2 space-y-1.5"
                >
                  {Object.keys(categories[categoryKey].lists).map(listKey => (
                    <Button
                      key={listKey}
                      variant="ghost"
                      className="w-full justify-start text-left py-2 px-3 text-sm sm:text-base hover:bg-primary/20 text-slate-300 hover:text-white"
                      onClick={() => onSelectList(listKey)}
                    >
                      {categories[categoryKey].lists[listKey].name}
                    </Button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      );
    };

    export default CategoryList;