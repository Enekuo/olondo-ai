import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Lock, CheckCircle, ArrowLeft, ShoppingCart } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const premiumPlanFeatures = [
    'pricingPremiumFeature1',
    'pricingPremiumFeature2',
    'pricingPremiumFeature3',
    'pricingPremiumFeature4',
    'pricingPremiumFeature5',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast({
        title: t('checkoutErrorTitle', 'Error'),
        description: t('checkoutErrorTerms', 'Debes aceptar los términos y condiciones.'),
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: t('checkoutSuccessToastTitle', '✅ ¡Suscripción Activada!'),
        description: t('checkoutSuccessToastBody', 'Tu suscripción a Olondo AI Premium está activa. Ya puedes crear contenido sin límites y usar todas las funciones avanzadas.'),
        variant: 'default',
        duration: 5000,
      });
      navigate('/');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-sky-100 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900 p-4 md:p-8"
    >
      <div className="absolute top-20 left-6 z-10">
          <Button variant="ghost" onClick={() => navigate('/pricing')} className="text-primary hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('checkoutGoBackToPlans', 'Volver a Planes')}
          </Button>
        </div>
      <div className="w-full max-w-4xl bg-white dark:bg-slate-800/80 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-10 grid md:grid-cols-2 gap-8 md:gap-12">
        
        <div className="md:border-r md:border-slate-200 dark:md:border-slate-700 md:pr-8">
          <div className="flex items-center mb-6">
            <ShoppingCart className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {t('checkoutTitle', 'Suscripción al Plan Premium')}
            </h1>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-1">{t('pricingPremiumTitle', 'Plan Premium')}</h2>
            <p className="text-3xl font-extrabold text-primary mb-3">
              {t('pricingPremiumPrice', '5,99 €')}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400"> {t('pricingPremiumPriceSuffix', '/ mes')}</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {t('checkoutRenewalInfo', 'Renovación automática mensual. Cancela cuando quieras.')}
            </p>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{t('checkoutIncludesTitle', 'Lo que incluye:')}</h3>
            <ul className="space-y-1.5">
              {premiumPlanFeatures.map(featureKey => (
                <li key={featureKey} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                  {t(featureKey)}
                </li>
              ))}
            </ul>
          </div>
           <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-4">
            <Lock size={12} className="mr-1.5" /> {t('checkoutSecurePaymentInfo', 'Pago seguro procesado por Stripe.')}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('checkoutPaymentFormTitle', 'Completa tu Pago')}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('checkoutFieldName', 'Nombre Completo')}</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required 
                     className="mt-1 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-primary dark:focus:border-primary"/>
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('checkoutFieldEmail', 'Correo Electrónico')}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                     className="mt-1 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-primary dark:focus:border-primary"/>
            </div>
            
            <div>
              <Label htmlFor="card-number" className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('checkoutFieldCardNumber', 'Número de Tarjeta')}</Label>
              <div className="relative mt-1">
                <Input id="card-number" type="text" placeholder="•••• •••• •••• ••••" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required 
                       className="pl-10 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-primary dark:focus:border-primary"/>
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry-date" className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('checkoutFieldExpiry', 'Fecha Caducidad')}</Label>
                <Input id="expiry-date" type="text" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required 
                       className="mt-1 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-primary dark:focus:border-primary"/>
              </div>
              <div>
                <Label htmlFor="cvc" className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('checkoutFieldCVC', 'CVC')}</Label>
                <Input id="cvc" type="text" placeholder="•••" value={cvc} onChange={(e) => setCvc(e.target.value)} required 
                       className="mt-1 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-primary dark:focus:border-primary"/>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
              <Label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                {t('checkoutAcceptTerms', 'Acepto los Términos y Condiciones y la Política de Privacidad.')}
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg py-3.5 mt-2" disabled={isProcessing}>
              {isProcessing ? t('checkoutButtonProcessing', 'Procesando...') : t('checkoutButtonPay', 'Pagar y Activar Plan Premium')}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;