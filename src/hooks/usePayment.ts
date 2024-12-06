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

      const stripe = await getStripe();
      if (!stripe) throw new Error('Stripe non initialisé');

      const API_BASE_URL = process.env.NODE_ENV === 'development' 
        ? 'https://project-live-kappa.vercel.app:3001' 
        : '';
      
      console.log('Sending payment data:', data);

      const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Server response:', response);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: 'Une erreur inconnue est survenue' };
        }
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement');
      }

      const session = await response.json();
      console.log('Stripe session created:', session);

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      console.error('Payment error:', err);
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
