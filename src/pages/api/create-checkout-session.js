import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Extract data from the request body
    const { name, email, amount } = req.body;

    if (!name || !email || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid payment data' });
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name,
            },
            unit_amount: Math.round(amount * 100), // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: email,
    });

    // Return the session ID
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
