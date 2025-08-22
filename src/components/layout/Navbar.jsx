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
    { nameKey: 'navSupport',       path: '/soporte',  isButton: false, icon: null, actionType: 'link' },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const linkBase =
    "transition-colors duration-150 ease-in-out flex items-center h-11 px-3 rounded-md text-[15px] font-medium";
  const navLinkClasses = (path) =>
    isActive(path)
      ? `${linkBase} text-slate-900 dark:text-slate-100`
      : `${linkBase} text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100`;

  return (
    <>
      {/* Barra blanca minimal como el ejemplo */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* IZQUIERDA: logo compacto */}
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
                className="h-16 w-auto shrink-0"  /* tamaño estilo Makeral */
              />
            </Link>

            {/* NAV LINKS centrales, estilo texto simple */}
            <nav className="hidden md:flex items-center justify-start ml-6">
              {navItemsCenter.map((item, index) => {
                const label =
                  item.nameKey === 'navPricing' ? t('navPricing', 'Planes')
                  : item.nameKey === 'navSupport' ? t('navSupport', 'Soporte')
                  : t(item.nameKey);

                return (
                  <button
                    key={item.nameKey}
                    onClick={() => navigate(item.path)}
                    className={`${navLinkClasses(item.path)} mr-1.5`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* DERECHA: idioma, tema y CTA rectangular */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center h-9 w-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              aria-label={t('themeToggle', 'Toggle theme')}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <Button
              onClick={() => navigate('/free-trial')}
              className="h-9 px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-sm"
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
              className="flex items-center justify-center h-9 w-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              aria-label={t('themeToggle', 'Toggle theme')}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-t border-slate-200 dark:border-slate-800 shadow-lg"
              style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}
            >
              <nav className="px-4 pb-6 pt-4 sm:px-6">
                <ul className="space-y-1">
                  {[
                    { nameKey: 'navCreateText', path: '/free-trial' },
                    { nameKey: 'navCreateSummary', path: '/free-trial' },
                    { nameKey: 'navPricing', path: '/pricing' },
                    { nameKey: 'navSupport', path: '/soporte' },
                  ].map((item) => (
                    <li key={item.nameKey}>
                      <button
                        onClick={() => { setIsMenuOpen(false); navigate(item.path); }}
                        className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                      >
                        {t(item.nameKey, item.nameKey)}
                      </button>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Button
                      onClick={() => { setIsMenuOpen(false); navigate('/free-trial'); }}
                      className="w-full h-9 px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                    >
                      <Gem size={14} className="mr-1.5" />
                      {t('navFreeTrial', 'Prueba Gratis')}
                    </Button>
                  </li>
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