import React from 'react';
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
    } from "@/components/ui/alert-dialog";
    import { Input } from '@/components/ui/input';

    const SaveListDialog = ({ isOpen, onOpenChange, listName, onListNameChange, onConfirm, dialogTitle = "Guardar Lista", descriptionText = "Introduce un nombre para tu lista." }) => {
      return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
          <AlertDialogContent className="bg-card border-primary text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-300">
                {descriptionText}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              placeholder="Nombre de la lista"
              value={listName}
              onChange={(e) => onListNameChange(e.target.value)}
              className="my-4 bg-input border-primary/50 focus:border-primary focus:ring-primary text-sm text-white placeholder-slate-400"
              autoFocus
            />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => onListNameChange('')} className="text-white border-slate-500 hover:bg-slate-700">Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm} className="bg-primary hover:bg-primary/90 text-white">Guardar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    };

    export default SaveListDialog;