import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

const AuthModal = ({ isOpen, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState("login");
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleFreeTrialClick = () => {
    onOpenChange(false); // Close the modal
    navigate('/free-trial'); // Navigate to free trial page
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 p-8 rounded-lg shadow-xl">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">{t('authModalTitle')}</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            {t('authModalSubtitle')}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 dark:bg-slate-800 rounded-md p-1">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-primary dark:data-[state=active]:text-primary data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 rounded-sm"
            >
              {t('authModalLoginTab')}
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-primary dark:data-[state=active]:text-primary data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 rounded-sm"
            >
              {t('authModalRegisterTab')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-slate-700 dark:text-slate-300">{t('authModalEmailLabel')}</Label>
                <Input id="login-email" type="email" placeholder="tu@email.com" className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-slate-700 dark:text-slate-300">{t('authModalPasswordLabel')}</Label>
                <Input id="login-password" type="password" placeholder="••••••••" className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base">
                {t('authModalLoginButton')}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form className="space-y-6">
               <div className="space-y-2">
                <Label htmlFor="register-name" className="text-slate-700 dark:text-slate-300">{t('authModalRegisterNameLabel', 'Nombre (opcional)')}</Label>
                <Input id="register-name" type="text" placeholder={t('authModalRegisterNamePlaceholder', 'Tu Nombre')} className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-slate-700 dark:text-slate-300">{t('authModalEmailLabel')}</Label>
                <Input id="register-email" type="email" placeholder="tu@email.com" className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-slate-700 dark:text-slate-300">{t('authModalPasswordLabel')}</Label>
                <Input id="register-password" type="password" placeholder={t('authModalRegisterPasswordPlaceholder', 'Crea una contraseña segura')} className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base">
                {t('authModalRegisterButton')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <Button 
            variant="outline" 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 text-base flex items-center justify-center"
            onClick={handleFreeTrialClick}
          >
            <Sparkles size={18} className="mr-2" />
            {t('navFreeTrial', 'Prueba Gratis')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;