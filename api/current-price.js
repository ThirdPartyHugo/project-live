import { getGlobalSuccessCount } from '../state.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const basePrice = 0.01;
    const registeredUsers = getGlobalSuccessCount(); // Retrieve the global variable
    const priceIncrement = 1.00;
    const currentPrice = basePrice + (registeredUsers * priceIncrement);

    res.status(200).json({
      currentPrice: Number(currentPrice.toFixed(2)),
      registeredUsers,
      basePrice,
      priceIncrement,
      currency: 'CAD',
    });
  } catch (error) {
    console.error('Error fetching current price:', error.message);
    res.status(500).json({ error: 'Failed to fetch current price' });
  }
}
