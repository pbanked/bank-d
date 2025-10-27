import { createClient } from "@/utils/supabase/client";

export default async function resetPasswordForEmail( email:string ) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail( email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/account/update-password`,
    });
    
    return {data, error}

}