import { createClient } from "@/utils/supabase/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function userLogOut(router: AppRouterInstance) {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  router.push("/")
  if (error) {
    return error;
  }
}
