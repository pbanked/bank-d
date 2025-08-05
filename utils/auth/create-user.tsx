import { createClient } from '@/utils/supabase/client'

// creates a new user 
export async function createUser(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  // returns user data or if fails, error message
  if (error) {
    return { error.message }
  }
  return { data }
}