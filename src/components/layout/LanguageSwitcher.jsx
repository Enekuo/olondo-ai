import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  // Usamos un CDN estable de banderas (lipis/flag-icons)
  { code: 'es', fullName: 'Español',  shortName: 'ES', flagUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/es.svg' },
  // Para inglés se suele mostrar la bandera de Reino Unido (gb). Si prefieres USA, cambia a "us.svg".
  { code: 'en', fullName: 'English',  shortName: 'EN', flagUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/gb.svg' },
  { code: 'it', fullName: 'Italiano', shortName: 'IT', flagUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/it.svg' },
  { code: 'fr', fullName: 'Français', shortName: 'FR', flagUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/fr.svg' },
  { code: 'pt', fullName: 'Português', shortName: 'PT', flagUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/pt.svg' },
  { code: 'de', fullName: 'Deutsch',  shortName: 'DE', flagUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/de.svg' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 p-0 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"
        >
          <img 
            src={currentLanguage.flagUrl} 
            alt={currentLanguage.fullName} 
            className="h-[18px] w-auto max-w-[28px] object-contain rounded-sm"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="sr-only">{currentLanguage.fullName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        {languages.map((lang) => (
          <TooltipProvider key={lang.code} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  onClick={() => setLanguage(lang.code)}
                  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center py-2 text-sm"
                >
                  <div className="w-[28px] h-[20px] flex items-center justify-center mr-2">
                    <img 
                      src={lang.flagUrl} 
                      alt={lang.fullName} 
                      className="max-h-[20px] max-w-full object-contain rounded-sm"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  {lang.shortName}
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-slate-800 dark:bg-slate-700 text-white dark:text-slate-200 border-none text-xs">
                <p>{lang.fullName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;