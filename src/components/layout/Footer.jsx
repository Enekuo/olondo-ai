import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto bg-background">
      <div className="container mx-auto text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t('copyrightText', `© ${currentYear} Olondo AI. Todos los derechos reservados.`, { year: currentYear })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;