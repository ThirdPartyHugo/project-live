import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl: string = "https://wxnhehfokxrwbutvpsoy.supabase.co";
const supabaseKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmhlaGZva3hyd2J1dHZwc295Iiwicm9zZSIsInNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzU0NjE0OSwiZXhwIjoyMDQ5MTIyMTQ5fQ.gOF0Y2EunAdA_rjaVSPDZRkfIaCeVvwspxHZukTYHLA";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided.');
}

// Initialize Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
