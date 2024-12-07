import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  await new Promise(resolve => req.on('end', resolve));

  const data = JSON.parse(body);
  const { name, email, amount } = data;

  if (!name || !email || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://${req.headers.host}/success`,
      cancel_url: `https://${req.headers.host}/cancel`,
      customer_email: email,
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
