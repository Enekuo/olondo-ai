import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentInputModal from '@/components/content-input/ContentInputModal';
import { useLanguage } from '@/contexts/LanguageContext';

const CreateTextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalOpenChange = (open) => {
    setIsModalOpen(open);
    if (!open) {
      // If the modal is closed, navigate back to the home page.
      // This keeps the previous behavior where closing the modal (e.g. via X button or overlay click)
      // takes the user back.
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto p-4 flex-grow flex items-center justify-center">
      {/* 
        The page content can be minimal as the modal takes focus.
        Added some placeholder text to indicate the page's purpose if the modal isn't visible.
      */}
      {!isModalOpen && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{t('createTextTitle') || "Crear Texto"}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t('createTextPagePlaceholder') || "Cargando el editor para crear texto..."}
          </p>
        </div>
      )}
      <ContentInputModal
        isOpen={isModalOpen}
        onOpenChange={handleModalOpenChange}
        title={t('createTextTitle') || "Crear Texto"}
        description={t('createTextDescription') || "Sube o introduce tu contenido para generar un nuevo texto."}
      />
    </div>
  );
};

export default CreateTextPage;