// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fogumjqrelsplhkkfchn.supabase.co' // Ton URL Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ3VtanFyZWxzcGxoa2tmY2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0OTE4MjQsImV4cCI6MjA2NTA2NzgyNH0.IzffKLpl2NPlbV5o0qKZbZno5gRPFwtxgfrH_Hj003Y' // Ta clé publique (API anon)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
