import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_live_51QBn7kI1pQH0GweMRNrHslY7L0s3a2JeTFC4tPUyOMowYZFLTuzA6LIeXz1vxISWkdQ9X7DsKUvrrF6V0i2rz4t200JsmDnWzn');
  }
  return stripePromise;
};