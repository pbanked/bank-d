import { createClient } from "@/utils/supabase/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function userLogin(
  email: string,
  password: string,
  router: AppRouterInstance
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Login error:", error.message);
    return error.message;
  }
  console.log("User Login:", data.user);
  router.push(`/${data.user?.id}/dashboard`);
  return null;
}
