import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PRIVATE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const { error } = await supabase.from('clients').insert([
      {
        name,
        email,
        date: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error adding user:', error.message);
      return res.status(500).json({ error: 'Failed to add user.' });
    }

    return res.status(200).json({ message: 'User added successfully.' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected error occurred.' });
  }
}
