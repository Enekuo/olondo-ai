import React from 'react';
    import { Button } from '@/components/ui/button';

    const ListDisplay = ({ category, onSelectList }) => {
      return (
        <div className="space-y-2">
          {Object.keys(category.lists).map(listKey => (
            <Button
              key={listKey}
              variant="outline"
              className="w-full justify-start text-left py-3 px-4 text-base sm:text-lg border-primary/50 hover:bg-primary/10"
              onClick={() => onSelectList(listKey)}
            >
              {category.lists[listKey].name}
            </Button>
          ))}
        </div>
      );
    };
    export default ListDisplay;