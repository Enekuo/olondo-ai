import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Sparkles, PlusCircle, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import AuthModal from '@/components/auth/AuthModal';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const navItemsCenter = [
    { nameKey: 'navHome', path: '/', isButton: false, actionType: 'link', icon: null },
    { nameKey: 'navCreateText', path: '/pricing', isButton: false, icon: PlusCircle, actionType: 'link' },
    { nameKey: 'navCreateSummary', path: '/pricing', isButton: false, icon: PlusCircle, actionType: 'link' },
  ];

  const isActive = (path) => location.pathname === path;

  const logoClasses = () => {
    // ↑ AUMENTADO proporcional a los botones del centro
    return "flex items-center text-xl font-semibold transition-colors duration-150 ease-in-out";
  };
  
  const navLinkClasses = (path, isMobile = false, hasIcon = false) => {
    // ↑ AUMENTADO: tipografía y sensación de botón (alto/padding)
    let baseClasses = "text-sm md:text-base font-medium transition-colors duration-150 ease-in-out flex items-center";
    if (isMobile) {
      baseClasses += " block px-3 py-2 rounded-md w-full text-left";
    } else if (hasIcon) {
      baseClasses += " h-11 md:h-12 px-3 md:px-4 rounded-md";
    } else {
      baseClasses += " h-11 md:h-12 px-3 md:px-4 rounded-md";
    }
    
    if (isActive(path)) {
      return `${baseClasses} text-slate-900 dark:text-slate-100`;
    }
    return `${baseClasses} text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200`;
  };

  const themeButtonClasses = () => {
    return "flex items-center justify-center h-9 w-9 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors duration-150 ease-in-out";
  }

  const premiumButtonClasses = () => {
    return "flex items-center justify-center h-9 px-4 rounded-md bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-300";
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  const allMobileNavItems = [
    { nameKey: 'navHome', path: '/', isButton: false, actionType: 'link', icon: null },
    { nameKey: 'navCreateText', path: '/free-trial', isButton: false, icon: PlusCircle, actionType: 'link' },
    { nameKey: 'navCreateSummary', path: '/free-trial', isButton: false, icon: PlusCircle, actionType: 'link' },
    { nameKey: 'navPremiumPlan', path: '/pricing', isButton: true, actionType: 'link', icon: Gem },
  ];

  const handleNavItemClick = (item, isMobile = false) => {
    if (isMobile) setIsMenuOpen(false);
    if (item.actionType === 'authModal') {
      setIsAuthModalOpen(true);
    } else if (item.actionType === 'link') {
      navigate(item.path);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* ↑ LOGO AUMENTADO de forma proporcionada */}
              <img
                src="/logo-olondo.png"
                alt="Olondo AI Logo"
                className="h-12 md:h-14 w-auto"
              />
            </Link> 
          </div>

          {/* ↑ Botones centro aumentados (altura/px y tipografía via navLinkClasses) */}
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-0.5 lg:space-x-1">
            {navItemsCenter.map((item) => (
              <Button
                key={item.nameKey}
                variant="ghost"
                // mantenemos size, reforzamos altura con clases
                size="sm"
                onClick={() => handleNavItemClick(item)}
                className={navLinkClasses(item.path, false, !!item.icon)}
              >
                {item.icon && <item.icon size={18} className="mr-1" />}
                {t(item.nameKey)}
              </Button>
            ))}
          </nav>

          {/* BLOQUE DERECHO — NO TOCAR */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className={themeButtonClasses()}
              aria-label={t('themeToggle', 'Toggle theme')}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <Button
              onClick={() => navigate('/pricing')} 
              className={premiumButtonClasses()}
            >
              <Gem size={14} className="mr-1.5" />
              {t('navPremiumPlan', 'Plan Premium')}
            </Button>
          </div>
          
          <div className="flex items-center md:hidden space-x-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className={themeButtonClasses()}
              aria-label={t('themeToggle', 'Toggle theme')}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md p-0 text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none border border-slate-300 dark:border-slate-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-t border-slate-200 dark:border-slate-700 shadow-lg"
              style={{ maxHeight: 'calc(100vh - 4rem)' , overflowY: 'auto' }}
            >
              <nav className="px-4 pb-6 pt-4 sm:px-6">
                <ul className="space-y-1">
                  {allMobileNavItems.map((item) => (
                    <li key={item.nameKey}>
                      <Button
                        variant={item.isButton ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleNavItemClick(item, true)}
                        className={`${item.isButton ? premiumButtonClasses() + ' w-full mt-2 justify-center' : navLinkClasses(item.path, true, !!item.icon) + ' w-full justify-start'}`}
                      >
                        {item.icon && <item.icon size={16} className="mr-1.5" />}
                        {t(item.nameKey)}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
};

export default Navbar;