
import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const storedLang = localStorage.getItem('olondo-ai-lang');
    if (storedLang && translations[storedLang]) {
      return storedLang;
    }
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('olondo-ai-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key, fallback, options = {}) => {
    let translation = translations[language]?.[key] || translations.en?.[key] || fallback || key;
    if (typeof translation === 'string') {
      Object.keys(options).forEach(optionKey => {
        translation = translation.replace(`{${optionKey}}`, options[optionKey]);
      });
    }
    return translation;
  };
  
  const currentLanguageData = {
    code: language,
    name: language === 'es' ? 'Español' : 
          language === 'en' ? 'English' :
          language === 'it' ? 'Italiano' :
          language === 'fr' ? 'Français' :
          language === 'pt' ? 'Português' :
          language === 'de' ? 'Deutsch' : 'English',
    flag: language === 'es' ? '🇪🇸' :
          language === 'en' ? '🇬🇧' :
          language === 'it' ? '🇮🇹' :
          language === 'fr' ? '🇫🇷' :
          language === 'pt' ? '🇵🇹' :
          language === 'de' ? '🇩🇪' : '🇬🇧'
  };

  const availableLanguages = Object.keys(translations).map(langCode => ({
    code: langCode,
    name: langCode === 'es' ? 'Español' : 
          langCode === 'en' ? 'English' :
          langCode === 'it' ? 'Italiano' :
          langCode === 'fr' ? 'Français' :
          langCode === 'pt' ? 'Português' :
          langCode === 'de' ? 'Deutsch' : 'English',
    flag: langCode === 'es' ? '🇪🇸' :
          langCode === 'en' ? '🇬🇧' :
          langCode === 'it' ? '🇮🇹' :
          langCode === 'fr' ? '🇫🇷' :
          langCode === 'pt' ? '🇵🇹' :
          langCode === 'de' ? '🇩🇪' : '🇬🇧'
  }));


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLanguageData, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
