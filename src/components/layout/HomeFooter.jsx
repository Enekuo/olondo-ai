import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';


const HomeFooter = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const aboutOlondoItems = [
    { id: 'what-is', titleKey: 'footerAboutTitle1', contentKey: 'footerAboutContent1' },
    { id: 'how-works', titleKey: 'footerAboutTitle2', contentKey: 'footerAboutContent2' },
    { id: 'listen-content', titleKey: 'footerAboutTitle3', contentKey: 'footerAboutContent3' },
    { id: 'create-text', titleKey: 'footerAboutTitle4', contentKey: 'footerAboutContent4' },
    { id: 'create-summary', titleKey: 'footerAboutTitle5', contentKey: 'footerAboutContent5' },
  ];

  const legalItems = [
    { titleKey: 'footerLegalTitle1', contentKey: 'footerLegalContent1', path: '/legal-notice' },
    { titleKey: 'footerLegalTitle2', contentKey: 'footerLegalContent2', path: '/privacy-policy' },
    { titleKey: 'footerLegalTitle3', contentKey: 'footerLegalContent3', path: '/terms-conditions' },
    { titleKey: 'footerLegalTitle4', contentKey: 'footerLegalContent4', path: '/synthetic-voice-use' },
    { titleKey: 'footerLegalTitle5', contentKey: 'footerLegalContent5', path: '/cookies-policy' },
  ];

  const handleSubscriptionClick = () => {
    toast({
      title: t('toastFeatureNotImplementedTitle', '🚧 Funcionalidad no implementada'),
      description: t('toastFeatureNotImplementedDescription', 'Esta función aún no está implementada, ¡pero no te preocupes! Puedes solicitarla en tu próximo mensaje. 🚀'),
      variant: "default",
    });
  };
  
  const handleLegalLinkClick = (e, path) => {
    e.preventDefault();
     toast({
      title: t('toastFeatureNotImplementedTitle', '🚧 Funcionalidad no implementada'),
      description: t('toastPageNotImplementedDescription', 'La página para "{linkName}" aún no está implementada. ¡Puedes solicitarla en tu próximo mensaje! 🚀', {linkName: t(legalItems.find(item => item.path === path)?.titleKey || path)}),
      variant: "default",
    });
  }


  return (
    <footer className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Columna 1: Sobre Olondo AI */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">{t('footerColumnAboutTitle', 'Sobre Olondo AI')}</h3>
            <Accordion type="single" collapsible className="w-full">
              {aboutOlondoItems.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="border-b-slate-200 dark:border-b-slate-700">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary">
                    {t(item.titleKey)}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs pt-1 pb-3 text-slate-600 dark:text-slate-400">
                    {t(item.contentKey).split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Columna 2: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">{t('footerColumnLegalTitle', 'Legal')}</h3>
            <ul className="space-y-2">
              {legalItems.map((item) => (
                <li key={item.titleKey}>
                  <Link 
                    to={item.path} 
                    onClick={(e) => handleLegalLinkClick(e, item.path)}
                    className="text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {t(item.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto y Comunidad */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">{t('footerColumnContactTitle', 'Contacto y Comunidad')}</h3>
            <div className="space-y-3 mb-6">
              <a href={`mailto:${t('footerContactEmailValue', 'olondoweb@gmail.com')}`} className="flex items-center text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                <Mail size={16} className="mr-2" />
                {t('footerContactEmailValue', 'olondoweb@gmail.com')}
              </a>
              <div className="flex space-x-3">
                <a href="#" onClick={(e) => {e.preventDefault(); handleSubscriptionClick();}} aria-label="Instagram" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleSubscriptionClick();}} aria-label="Twitter" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" onClick={(e) => {e.preventDefault(); handleSubscriptionClick();}} aria-label="LinkedIn" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2 text-slate-800 dark:text-slate-200">{t('footerLanguageTitle', 'Idioma')}</h4>
              <LanguageSwitcher />
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 text-slate-800 dark:text-slate-200">{t('footerSubscriptionTitle', 'Plan Pro')}</h4>
              <Button 
                onClick={handleSubscriptionClick}
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white text-sm"
              >
                <Sparkles size={16} className="mr-2" />
                {t('footerSubscribeButton', 'Suscribirse al Plan Pro')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;