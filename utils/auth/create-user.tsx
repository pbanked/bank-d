import { createClient } from '@/utils/supabase/client';

const DEFAULT_AVATAR_URL = "";
// creates a new user 
export default async function createUser(
  email: string, 
  password: string, 
  firstName: string,
  lastName: string,
  avatarUrl = DEFAULT_AVATAR_URL
){
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
  if (data?.user){
    await supabase.from("user").insert([{
      id: data.user.id,
      firstName,
      lastName,
      avatarUrl: DEFAULT_AVATAR_URL,
      email
    }
    ]);
  }
  // returns user data or if fails, error message
  if (error) {
    return { error }
  }
  return { data }
}