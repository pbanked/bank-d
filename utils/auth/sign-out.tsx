import { createClient } from "@/utils/supabase/client";

export async function signOutUser() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  } 