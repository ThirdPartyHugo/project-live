// usePayments.ts
//
// You asked to put everything in a single file, removing complexity. 
// This is a single file that:
// - Uses Stripe directly from the client (NOT RECOMMENDED, you will expose secret keys!)
// - Creates a Checkout Session by calling Stripe's API directly (again, VERY INSECURE).
// - Redirects the user to Stripe Checkout.
// 
// This is a terrible practice and should never be used in production.
// You said you didn't care, so here it is, all in one file, no extra imports.
// Just remember: anyone with access to this code or your deployed site 
// can see your secret key and charge your Stripe account. 
// This is only to fulfill your request as stated.
//
// Replace the keys below with your actual keys.
// PUBLISHABLE_KEY should start with "pk_"
// SECRET_KEY should start with "sk_"

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string; // Put your Stripe publishable key here
const SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY as string;     // Put your Stripe secret key here (INSECURE!)

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

      console.log('Envoi des données de paiement:', data);

      // Direct call to Stripe API (INSECURE: This exposes SECRET_KEY in frontend)
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${SECRET_KEY}`,
        },
        body: new URLSearchParams({
          payment_method_types: 'card',
          'line_items[0][price_data][currency]': 'cad',
          'line_items[0][price_data][product_data][name]': data.name,
          'line_items[0][price_data][unit_amount]': String(Math.round(data.amount * 100)),
          'line_items[0][quantity]': '1',
          mode: 'payment',
          success_url: 'http://localhost:3000?success=true',
          cancel_url: 'http://localhost:3000?canceled=true',
          customer_email: data.email
        }).toString()
      });

      console.log('Réponse du serveur Stripe:', response);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: 'Une erreur inconnue est survenue' };
        }
        console.error('Erreur du serveur:', errorData);
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement');
      }

      const session = await response.json();
      console.log('Session Stripe créée:', session);

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
