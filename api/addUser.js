import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = "https://wxnhehfokxrwbutvpsoy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmhlaGZva3hyd2J1dHZwc295Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzU0NjE0OSwiZXhwIjoyMDQ5MTIyMTQ5fQ.gOF0Y2EunAdA_rjaVSPDZRkfIaCeVvwspxHZukTYHLA";
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
