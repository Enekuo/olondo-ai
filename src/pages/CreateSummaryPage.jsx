import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentInputModal from '@/components/content-input/ContentInputModal';
import { useLanguage } from '@/contexts/LanguageContext';

const CreateSummaryPage = () => {
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
          <h1 className="text-3xl font-bold mb-4">{t('createSummaryTitle') || "Crear Resumen"}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t('createSummaryPagePlaceholder') || "Cargando el editor para crear resúmenes..."}
          </p>
        </div>
      )}
      <ContentInputModal
        isOpen={isModalOpen}
        onOpenChange={handleModalOpenChange}
        title={t('createSummaryTitle') || "Crear Resumen"}
        description={t('createSummaryDescription') || "Sube o introduce tu contenido para generar un resumen."}
      />
    </div>
  );
};

export default CreateSummaryPage;