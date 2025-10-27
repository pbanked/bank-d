import { createClient } from "@/utils/supabase/client";

export default async function signOutUser() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  } 