import { createClient } from '@/utils/supabase/client';

// creates a new user 
export default async function createUser(
  email: string, 
  password: string, 
  firstName: string,
  lastName: string){
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
      },
    },
  });
  // returns user data or if fails, error message
  if (error) {
    return { error }
  }
  return { data }
}