import React, { useState } from 'react';
import { DollarSign, CheckCircle, Shield, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { NDAModal } from './NDAModal';
import { validateEmail, validateName } from '../utils/validation';
import { useDynamicPrice } from '../hooks/useDynamicPrice';
import { usePayment } from '../hooks/usePayment';
import { supabase } from '../supabase'; // Import the Supabase client

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
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status

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

  // Function to add user to Supabase
  const addUserToDatabase = async () => {
    try {
      const { error } = await supabase.from('clients').insert([
        {
          name: formData.name,
          email: formData.email,
          date: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
        throw new Error('Une erreur est survenue lors de l\'ajout de vos informations.');
      }
    } catch (err) {
     
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 'personal' && validateForm()) {
      setIsSubmitting(true); // Start submission process
      try {
        await addUserToDatabase(); // Add user to the database
        setIsSubmitting(false); // End submission process
        setCurrentStep('nda'); // Proceed to the NDA step
      } catch (err) {
        
        setIsSubmitting(false); // End submission process
      }
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

  const handleNDAAccept = () => {
    setFormData((prev) => ({ ...prev, ndaAccepted: true }));
    setShowNDA(false);
    setCurrentStep('payment');
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-accent"
                placeholder="Jean Dupont"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-accent mb-1">
                Adresse Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-2 bg-dark border border-accent/30 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-accent"
                placeholder="jean@exemple.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
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
        // Payment step remains unchanged
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
