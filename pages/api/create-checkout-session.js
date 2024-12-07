import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// The Stripe secret key should be stored in a .env file and never exposed to the client.
// This line will only work on the server side. On the client side, process.env won't have this value.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY; 

// Initialize Stripe on the server side
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
export async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, amount } = req.body;

  if (!name || !email || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  if (!stripe) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'cad',
          product_data: { name },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://project-live-kappa.vercel.app/success',
      cancel_url: 'https://project-live-kappa.vercel.app/cancel',
      customer_email: email,
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}