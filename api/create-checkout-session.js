import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';
import { getGlobalSuccessCount, setGlobalSuccessCount } from '../state.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

// Path to the JSON file to store client data
const clientsFilePath = path.join(process.cwd(), 'api', 'data', 'clients.json');

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

    // Increment the shared global variable
    const currentCount = getGlobalSuccessCount();
    setGlobalSuccessCount(currentCount + 1);

    // Add client data to the JSON file
    const clientData = { name, email, date: new Date().toISOString() };

    try {
      // Ensure the clients file exists or create it
      const data = await fs.promises.readFile(clientsFilePath, 'utf8').catch((error) => {
        if (error.code === 'ENOENT') {
          console.log('Clients file not found. Creating a new one...');
          return '[]'; // Initialize with an empty JSON array
        }
        throw error;
      });

      const clients = JSON.parse(data);
      clients.push(clientData);

      await fs.promises.writeFile(clientsFilePath, JSON.stringify(clients, null, 2));
      console.log('Client data added successfully:', clientData);
    } catch (error) {
      console.error('Error handling clients file:', error);
    }

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error.message);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
