import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Save } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    const GlobalControls = ({
      hasContent,
      onSave,
      isSavedList,
      alwaysShowSaveButton = false,
      pageContext = "default" 
    }) => {
      const { toast } = useToast();

      const handleSaveClick = () => {
        if (!hasContent && !isSavedList) {
          toast({
            title: "Lista Vacía",
            description: "Debes tener al menos una palabra y su traducción para guardar.",
            variant: "destructive",
          });
          return;
        }
        onSave();
      };

      let buttonVariant = "default";
      let buttonPositionClass = "justify-center";
      let buttonSizeClass = "w-full max-w-xs";

      if (pageContext === "createList" || pageContext === "importList") {
        buttonVariant = "default";
        buttonPositionClass = "justify-end";
        buttonSizeClass = "w-auto";
      } else if (pageContext === "myLists") {
        buttonVariant = isSavedList ? "secondary" : "default";
        buttonPositionClass = "justify-center";
        buttonSizeClass = "w-full max-w-xs";
      }


      return (
        <div className={`mt-auto pt-4 pb-2 sticky bottom-0 bg-card/80 backdrop-blur-sm z-10 border-t border-primary/30`}>
          <div className={`flex items-center space-x-3 ${buttonPositionClass} px-4`}>
            {(alwaysShowSaveButton || hasContent || isSavedList) && (
              <Button
                variant={buttonVariant}
                size="lg"
                onClick={handleSaveClick}
                className={`text-base font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-150 ease-in-out transform active:scale-95 ${buttonSizeClass} ${pageContext === "createList" || pageContext === "importList" ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
              >
                <Save size={20} />
                <span>{isSavedList ? 'Actualizar Lista' : 'Guardar Lista'}</span>
              </Button>
            )}
          </div>
        </div>
      );
    };

    export default GlobalControls;