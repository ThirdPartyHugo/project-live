import { useState } from 'react';
import { getStripe } from '../config/stripe';

interface PaymentHookResult {
  handlePayment: (data: PaymentData) => Promise<void>;
  isProcessing: boolean;
  error: string | null;
}

interface PaymentData {
  name: string;
  email: string;
  amount: number;
}

export const usePayment = (): PaymentHookResult => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (data: PaymentData) => {
    try {
      setIsProcessing(true);
      setError(null);

      const stripe = await getStripe();
      if (!stripe) throw new Error('Stripe non initialisé');

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement');
      }

      const session = await response.json();
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
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
    error
  };
};