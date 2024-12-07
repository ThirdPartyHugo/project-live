import React, { useState } from 'react';
import { DollarSign, CheckCircle, Shield, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { NDAModal } from './NDAModal';
import { validateEmail, validateName } from '../utils/validation';
import { useDynamicPrice } from '../hooks/useDynamicPrice';
import { usePayment } from '../hooks/usePayment';

type Step = 'personal' | 'nda' | 'payment';

interface FormData {
  name: string;
  email: string;
  ndaAccepted: boolean;
}

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    ndaAccepted: false,
  });
  const [showNDA, setShowNDA] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentPrice, currency } = useDynamicPrice();
  const { handlePayment, isProcessing, error: paymentError } = usePayment();

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!validateName(formData.name)) {
      newErrors.name = 'Veuillez entrer un nom valide';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonalSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Call the backend API to add the user
        const response = await fetch('/api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
          }),
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || 'Failed to add user.');
        }

        const { message } = await response.json();
        console.log(message);

        setCurrentStep('nda'); // Navigate to the NDA step
      } catch (err) {
        console.error('Error during form submission:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNDAAccept = () => {
    if (currentPrice === 60) {
      // Display error message if price is $60
      setErrors((prev) => ({
        ...prev,
        price: 'Le nombre maximal de participants est atteint.',
      }));
      return; // Prevent transitioning to the payment step
    }
  
    setFormData((prev) => ({ ...prev, ndaAccepted: true }));
    setShowNDA(false);
    setCurrentStep('payment');
  
    // Make the API call after transitioning to the payment step
    fetch('/api/updateNDA', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.email }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(({ error }) => {
            throw new Error(error || 'Failed to update NDA status.');
          });
        }
        return response.json();
      })
      .then(({ message }) => {
        console.log('NDA status updated successfully:', message);
      })
      .catch((err) => {
        console.error('Error updating NDA status:', err);
        // Optionally, handle the error gracefully here (e.g., show a toast or message to the user)
      });
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 'personal') {
      await handlePersonalSubmit();
    } else if (currentStep === 'payment') {
      try {
        await handlePayment({
          name: formData.name,
          email: formData.email,
          amount: currentPrice,
        });
      } catch (err) {
        console.error('Erreur de paiement:', err);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-accent mb-1">
                Nom Complet *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-accent"
                placeholder="Jean Dupont"
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-accent mb-1">
                Adresse Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-accent"
                placeholder="jean@exemple.com"
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <button
              type="button"
              onClick={handlePersonalSubmit}
              className="w-full px-6 py-3 bg-accent text-dark rounded-lg hover:bg-accent/90 flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : 'Continuer vers le NDA'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        );

      case 'nda':
        return (
          <div className="space-y-6">
            <div className="bg-purple/10 p-6 rounded-lg border border-purple/30">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-semibold text-accent">Accord de Non-Divulgation</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Avant de procéder au paiement, vous devez lire et accepter notre accord de confidentialité.
              </p>
              <button
                onClick={() => setShowNDA(true)}
                className="w-full px-6 py-3 bg-accent text-dark rounded-lg hover:bg-accent/90 flex items-center justify-center gap-2 font-semibold"
              >
                Lire le NDA <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => setCurrentStep('personal')}
              className="w-full px-6 py-3 border border-accent/30 text-accent rounded-lg hover:bg-accent/10 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" /> Retour
            </button>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="bg-purple/10 p-6 rounded-lg border border-purple/30">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-semibold text-accent">Paiement Sécurisé</h3>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-accent">Récapitulatif de votre inscription:</p>
                <div className="bg-dark/50 p-4 rounded-lg space-y-2 border border-accent/20">
                  <p className="text-gray-400">
                    <span className="font-medium text-accent">Nom:</span> {formData.name}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-accent">Email:</span> {formData.email}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-accent">NDA:</span> Accepté
                  </p>
                </div>
              </div>

              {paymentError && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                  {paymentError}
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-dark/50 rounded-lg mb-4 border border-accent/20">
                <span className="font-medium text-accent">Montant Total:</span>
                <div className="flex items-center gap-1 text-accent">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-xl font-bold">{currentPrice.toFixed(2)}</span>
                  <span className="text-sm">{currency}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full px-6 py-3 bg-accent text-dark rounded-lg hover:bg-accent/90 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  'Traitement...'
                ) : (
                  <>
                    Payer Maintenant <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setCurrentStep('nda')}
              disabled={isProcessing}
              className="w-full px-6 py-3 border border-accent/30 text-accent rounded-lg hover:bg-accent/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-5 w-5" /> Retour
            </button>
          </div>
        );
    }
  };

  return (
    <section id="register" className="py-20 bg-dark border-t border-accent/20">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-accent">Réservez Votre Place</h2>
          <p className="text-gray-400">
            Rejoignez notre session exclusive ce lundi et apprenez de vrais projets clients.
          </p>
        </div>

        <div className="bg-dark/50 p-8 rounded-xl border border-accent/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}
          </form>
        </div>

        <NDAModal
          isOpen={showNDA}
          onClose={() => setShowNDA(false)}
          onAccept={handleNDAAccept}
        />
      </div>
    </section>
  );
}
