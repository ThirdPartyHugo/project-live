import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
  }

  try {
    const { name, email, amount } = req.body;
    if (!name || !email || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Données de paiement invalides' });
    }

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
      success_url: `http://localhost:3000?success=true`,
      cancel_url: `http://localhost:3000?canceled=true`,
      customer_email: email,
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    return res.status(500).json({ error: 'Impossible de créer la session' });
  }
}
