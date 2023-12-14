import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jhroaxzktdjrgodrcohz.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impocm9heHprdGRqcmdvZHJjb2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxMzc5NTEsImV4cCI6MjAxNzcxMzk1MX0.Ows0WFv51P2v6xogdqpfmeCjtDJ_d7NGnERjFSkud8Y";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;