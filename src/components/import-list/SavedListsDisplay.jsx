import React from 'react';
    import { Button } from '@/components/ui/button';
    import { ListX, CheckCircle } from 'lucide-react';
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from "@/components/ui/alert-dialog";

    const SavedListsDisplay = ({ wordLists, activeListId, onLoadList, onDeleteList, emptyMessage = "No hay listas guardadas." }) => {
      
      return (
        <div className="mb-6 w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-white">Mis Listas Guardadas</h2>
          </div>
          {wordLists.length === 0 ? (
             <p className="text-sm text-slate-400 text-center py-4">{emptyMessage}</p>
          ) : (
            <div className="max-h-40 overflow-y-auto space-y-1.5 p-1.5 bg-secondary/50 rounded-md border border-primary/30 custom-scrollbar">
              {wordLists.map(list => (
                <div key={list.id} className={`flex justify-between items-center p-2.5 rounded-md cursor-pointer transition-all duration-200 ease-in-out ${activeListId === list.id ? 'bg-primary/20 border-primary shadow-md' : 'hover:bg-primary/10 border-transparent'} border`}>
                  <span className="font-medium text-sm text-white flex-grow truncate mr-2" onClick={() => onLoadList(list.id)} title={list.name}>
                    {activeListId === list.id && <CheckCircle size={16} className="inline mr-2 text-green-400" />}
                    {list.name}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <Button variant="ghost" size="sm" onClick={() => onLoadList(list.id)} className="text-primary hover:text-accent hover:bg-primary/20 px-2 h-7 text-xs">Cargar</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/20 h-7 w-7">
                          <ListX size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-card border-primary text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-300">
                            Esta acción no se puede deshacer. Esto eliminará permanentemente la lista "{list.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="text-white border-slate-500 hover:bg-slate-700">Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDeleteList(list.id)} className="bg-red-600 hover:bg-red-700 text-white">Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    export default SavedListsDisplay;