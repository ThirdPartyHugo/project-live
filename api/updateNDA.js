import { createClient } from '@supabase/supabase-js';

// Supabase initialization
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PRIVATE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Add .select('*') to get the updated rows
      const { data, error } = await supabase
        .from('clients')
        .update({ nda: true })
        .eq('email', email)
        .select('*'); // This ensures updated rows are returned

      if (error) {
        throw new Error(error.message);
      }

      if (data.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'NDA status updated successfully', data });
    } catch (err) {
      console.error('Error updating NDA status:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
