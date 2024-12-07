// usePayments.ts
//
// This version calls a secure backend API route to create the Stripe session.
// The secret key is NOT exposed here.
// The publishable key is still needed to initialize Stripe.js on the frontend.

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY; // Public key from env

const stripePromise = loadStripe(PUBLISHABLE_KEY);

interface PaymentData {
  name: string;
  email: string;
  amount: number;
}

interface PaymentHookResult {
  handlePayment: (data: PaymentData) => Promise<void>;
  isProcessing: boolean;
  error: string | null;
}

export const usePayment = (): PaymentHookResult => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePaymentData = (data: PaymentData): void => {
    if (!data.name || !data.email || !data.amount || data.amount <= 0) {
      throw new Error('Les informations de paiement sont invalides.');
    }
  };

  const handlePayment = async (data: PaymentData) => {
    try {
      validatePaymentData(data);
      setIsProcessing(true);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe non initialisé');
      }

      console.log('Envoi des données de paiement au backend:', data);

      // Call your internal API route instead of Stripe directly.
      const response = await fetch('https://project-live-kappa.vercel.app/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Une erreur inconnue est survenue' }));
        console.error('Erreur du serveur backend:', errorData);
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement');
      }

      const session = await response.json();
      console.log('Session Stripe créée par le backend:', session);

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

    } catch (err: any) {
      console.error('Erreur de paiement:', err);
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handlePayment,
    isProcessing,
    error,
  };
};
