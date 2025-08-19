import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Gem } from 'lucide-react';
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
    { nameKey: 'navCreateText',    path: '/pricing',  isButton: false, icon: null, actionType: 'link' },
    { nameKey: 'navCreateSummary', path: '/pricing',  isButton: false, icon: null, actionType: 'link' },
    { nameKey: 'navPricing',       path: '/pricing',  isButton: false, icon: null, actionType: 'link' },
    { nameKey: 'navSupport',       path: '/support',  isButton: false, icon: null, actionType: 'link' },
  ];

  const isActive = (path) => location.pathname === path;

  const themeButtonClasses = () => {
    return "flex items-center justify-center h-9 w-9 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors duration-150 ease-in-out";
  };

  const premiumButtonClasses = () => {
    return "flex items-center justify-center h-9 px-4 rounded-md bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-300";
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const navLinkClasses = (path, { isMobile = false } = {}) => {
    const base = "transition-colors duration-150 ease-in-out flex items-center";
    const size = "text-sm md:text-base font-medium";
    const box  = isMobile ? "block px-3 py-2 rounded-md w-full text-left" : "h-11 md:h-12 px-3 md:px-4 rounded-md";

    if (isActive(path)) {
      return `${base} ${size} ${box} text-slate-900 dark:text-slate-100`;
    }
    return `${base} ${size} ${box} text-slate-900 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-100`;
  };

  const allMobileNavItems = [
    { nameKey: 'navCreateText', path: '/free-trial', isButton: false, actionType: 'link' },
    { nameKey: 'navCreateSummary', path: '/free-trial', isButton: false, actionType: 'link' },
    { nameKey: 'navFreeTrial', path: '/free-trial', isButton: true, actionType: 'link', icon: Gem },
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

          {/* IZQUIERDA */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center space-x-2"
            >
              <img
                src="/logo-olondo.png"
                alt="Olondo AI Logo"
                className="h-[26px] md:h-[34px] w-auto shrink-0"
              />
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden md:flex items-center justify-start ml-6 md:ml-8">
              {navItemsCenter.map((item, index) => {
                const label =
                  item.nameKey === 'navPricing' ? t('navPricing', 'Planes')
                  : item.nameKey === 'navSupport' ? t('navSupport', 'Soporte')
                  : t(item.nameKey);

                const mr =
                  index === 0 ? 10 : (index < navItemsCenter.length - 1 ? 4 : 0);

                return (
                  <Button
                    key={item.nameKey}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavItemClick(item)}
                    className={navLinkClasses(item.path, { isMobile: false })}
                    style={{ marginRight: `${mr}px` }}
                  >
                    {label}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* DERECHA */}
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
              onClick={() => navigate('/free-trial')}
              className={premiumButtonClasses()}
            >
              <Gem size={14} className="mr-1.5" />
              {t('navFreeTrial', 'Prueba Gratis')}
            </Button>
          </div>

          {/* MÓVIL */}
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
              style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}
            >
              <nav className="px-4 pb-6 pt-4 sm:px-6">
                <ul className="space-y-1">
                  {allMobileNavItems.map((item) => (
                    <li key={item.nameKey}>
                      <Button
                        variant={item.isButton ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleNavItemClick(item, true)}
                        className={`${item.isButton ? premiumButtonClasses() + ' w-full mt-2 justify-center' : navLinkClasses(item.path, { isMobile: true }) + ' w-full justify-start'}`}
                      >
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