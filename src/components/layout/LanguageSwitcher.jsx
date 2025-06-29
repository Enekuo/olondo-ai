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
  { code: 'es', fullName: 'Español', shortName: 'ES', flagUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/0938f0a9-b7a5-4869-ab6b-3b773ccf2511/8b94ad513cbdc384ffdf7c82cb40748d.png' },
  { code: 'en', fullName: 'English', shortName: 'EN', flagUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/0938f0a9-b7a5-4869-ab6b-3b773ccf2511/01bda96f5248bb09b994d8a3e06cf818.png' },
  { code: 'it', fullName: 'Italiano', shortName: 'IT', flagUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/0938f0a9-b7a5-4869-ab6b-3b773ccf2511/0c11e246e9ce34c66c78ed7845e5b33e.png' },
  { code: 'fr', fullName: 'Français', shortName: 'FR', flagUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/0938f0a9-b7a5-4869-ab6b-3b773ccf2511/b8a957d5835f0cd72dbf8178c3d8e4a6.png' },
  { code: 'pt', fullName: 'Português', shortName: 'PT', flagUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/0938f0a9-b7a5-4869-ab6b-3b773ccf2511/8fa00336c326f28ea6f14088076a6f95.png' },
  { code: 'de', fullName: 'Deutsch', shortName: 'DE', flagUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/0938f0a9-b7a5-4869-ab6b-3b773ccf2511/af49a07fdcbce77ad78dfd2f201a38ed.png' },
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