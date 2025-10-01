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
    return { error: error.message }
  }
  return { data }
}

// sign out
export async function signOutUser() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error}
} 

//third party auth w/ google
export async function signInWithOAuth() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
    })
    if (error) {
        return { error: error.message }
    }
    //redirects to the OAuth provider
    if (data?.url){
        window.location.href = data.url;
    }
}