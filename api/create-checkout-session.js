import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { getGlobalSuccessCount, setGlobalSuccessCount } from '../state.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

// Supabase initialization
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PRIVATE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, amount } = req.body;

  if (!name || !email || !amount || amount <= 0) {
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
      success_url: `https://www.workenligne.com/`,
      cancel_url: `https://www.workenligne.com/`,
      customer_email: email,
    });

    // Increment the global success count
    const currentCount = getGlobalSuccessCount();
    await setGlobalSuccessCount(currentCount + 1);

    // Add client data to Supabase
    const { error } = await supabase.from('clients').insert([
      {
        name,
        email,
        date: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error adding client data:', error.message);
    }

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error.message);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
