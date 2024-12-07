import { createClient } from '@supabase/supabase-js';

// Supabase initialization
const supabaseUrl = "https://wxnhehfokxrwbutvpsoy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmhlaGZva3hyd2J1dHZwc295Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzU0NjE0OSwiZXhwIjoyMDQ5MTIyMTQ5fQ.gOF0Y2EunAdA_rjaVSPDZRkfIaCeVvwspxHZukTYHLA";
const supabase = createClient(supabaseUrl, supabaseKey);

let globalSuccessCount = 0; // Fallback in case of database issues

// Fetch the initial count from Supabase
const initializeCount = async () => {
  const { data, error } = await supabase
    .from('global_counts')
    .select('count')
    .eq('id', 1) 
    .single(); 

  if (error) {
    console.error('Error fetching global success count:', error.message);
  } else {
    globalSuccessCount = data ? data.count : 0;
  } 
}; 

// Run the initialization on import
initializeCount(); 

// Update the count in Supabase
export const setGlobalSuccessCount = async (value) => {
  globalSuccessCount = value;

  const { error } = await supabase
    .from('global_counts')
    .upsert({ id: 1, count: globalSuccessCount });

  if (error) {
    console.error('Error updating global success count:', error.message);
  }
};

// Retrieve the count
export const getGlobalSuccessCount = () => globalSuccessCount;
//please i need you to redeploy