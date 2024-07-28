import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://emzdovcukfjmrteynkci.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtemRvdmN1a2ZqbXJ0ZXlua2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMDUxMzQsImV4cCI6MjAzNzU4MTEzNH0.4166SxDy6BYLDkAIhCB3PwobzhmSpTLtpCrn-0W8DWI";
export const supabase = createClient(supabaseUrl, supabaseKey);
