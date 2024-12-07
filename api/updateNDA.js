import { createClient } from '@supabase/supabase-js';

// Supabase initialization
const supabaseUrl = "https://wxnhehfokxrwbutvpsoy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmhlaGZva3hyd2J1dHZwc295Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzU0NjE0OSwiZXhwIjoyMDQ5MTIyMTQ5fQ.gOF0Y2EunAdA_rjaVSPDZRkfIaCeVvwspxHZukTYHLA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const { data, error } = await supabase
        .from('clients')
        .update({ nda: true })
        .eq('email', email);

      if (error) {
        throw new Error(error.message);
      }

      if (data.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'NDA status updated successfully' });
    } catch (err) {
      console.error('Error updating NDA status:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
