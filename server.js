import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 
// Middleware
app.use(cors({
  origin: process.env.VITE_APP_URL,
  credentials: true
}));

app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')));
}

// Routes
app.get('/api/current-price', (req, res) => {
  try {
    const registeredUsers = 0; // This would come from your database
    const basePrice = 10.00;
    const priceIncrement = 1.00;
    const currentPrice = basePrice + (registeredUsers * priceIncrement);
    
    res.json({
      currentPrice: Number(currentPrice.toFixed(2)),
      registeredUsers,
      basePrice,
      priceIncrement,
      currency: 'CAD'
    });
  } catch (error) {
    console.error('Error calculating price:', error);
    res.status(500).json({ error: 'Error calculating price' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Session WorkEnLigne',
              description: 'Accès à la session exclusive'
            },
            unit_amount: Math.round(amount * 100)
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.VITE_APP_URL}/success`,
      cancel_url: `${process.env.VITE_APP_URL}/cancel`,
      customer_email: email,
      metadata: { name, email }
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

// Catch-all route for SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});