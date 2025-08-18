import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
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
    { nameKey: 'navCreateText', path: '/create-text' },
    { nameKey: 'navCreateSummary', path: '/create-summary' },
    { nameKey: 'navPricing', path: '/pricing' },
    { nameKey: 'navSupport', path: '/support' },
  ];

  const navItemsRight = [
    { nameKey: 'navFreeTrial', path: '/free-trial', icon: <Sparkles className="h-4 w-4" /> },
  ];

  const handleNavItemClick = (item) => {
    if (item.path === '/login') {
      setIsAuthModalOpen(true);
    } else {
      navigate(item.path);
      setIsMenuOpen(false);
    }
  };

  const navLinkClasses = (path, { isMobile = false, hasIcon = false, isTitle = false } = {}) => {
    const base = isMobile
      ? "w-full text-left px-3 py-2 rounded-md text-sm font-medium"
      : "text-sm font-medium transition-colors";

    const active = location.pathname === path
      ? "text-blue-600"
      : "text-gray-900 dark:text-gray-100 hover:text-blue-600";

    const spacing = hasIcon ? "flex items-center gap-2" : "";

    const weight = isTitle ? "font-semibold" : "";

    return `${base} ${active} ${spacing} ${weight}`;
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center" style={{ marginLeft: "-12px" }}>
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Olondo AI"
              />
              <span className="ml-2 font-bold text-xl text-blue-600">Olondo.AI</span>
            </Link>
          </div>

          {/* Menú centro */}
          <div className="hidden md:flex items-center justify-start gap-4 ml-6 md:ml-8">
            {navItemsCenter.map((item, index) => {
              const isTitle = item.nameKey === 'navCreateText'; // El primero (Crear Texto)
              return (
                <Button
                  key={item.nameKey}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavItemClick(item)}
                  className={navLinkClasses(item.path, { isMobile: false, hasIcon: !!item.icon, isTitle })}
                  style={{
                    marginLeft: isTitle ? "0px" : "0px", // "Crear Texto" no cambia
                    marginRight: isTitle ? "24px" : "0px" // Espacio solo después de "Crear Texto"
                  }}
                >
                  {item.nameKey === 'navPricing'
                    ? t('navPricing', 'Planes')
                    : item.nameKey === 'navSupport'
                    ? t('navSupport', 'Soporte')
                    : t(item.nameKey)}
                </Button>
              );
            })}
          </div>

          {/* Menú derecho */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {navItemsRight.map((item) => (
              <Button
                key={item.nameKey}
                onClick={() => handleNavItemClick(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {item.icon}
                {t(item.nameKey)}
              </Button>
            ))}
          </div>

          {/* Botón hamburguesa */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItemsCenter.map((item) => (
                <button
                  key={item.nameKey}
                  onClick={() => handleNavItemClick(item)}
                  className={navLinkClasses(item.path, { isMobile: true })}
                >
                  {t(item.nameKey)}
                </button>
              ))}
              {navItemsRight.map((item) => (
                <button
                  key={item.nameKey}
                  onClick={() => handleNavItemClick(item)}
                  className={navLinkClasses(item.path, { isMobile: true, hasIcon: !!item.icon })}
                >
                  {item.icon}
                  {t(item.nameKey)}
                </button>
              ))}
              <LanguageSwitcher />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full mt-2"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {theme === 'dark' ? t('lightMode', 'Modo Claro') : t('darkMode', 'Modo Oscuro')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;