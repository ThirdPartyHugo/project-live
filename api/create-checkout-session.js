// api/create-checkout-session.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  console.log(`Received request: ${req.method} ${req.url}`);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    console.error(`Method not allowed: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, amount } = req.body;

  console.log('Received payment data:', { name, email, amount });

  if (!name || !email || !amount || amount <= 0) {
    console.error('Invalid data received:', { name, email, amount });
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: { name },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: email,
    });

    console.log('Stripe session created:', session.id);

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error.message || error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
