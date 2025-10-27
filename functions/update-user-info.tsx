import { createClient } from '@/utils/supabase/client';
import { User } from '../app/types/User';


export default async function updateUserInfo(updatedFields: Partial<User> ){
    const supabase = createClient();
    const { data: userData, error: authError } 
    = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user || authError){
         return {data: null, error: authError || new Error("User not authenticated")}; 
    }

    const { data, error } = await supabase
    .from("user")
    .update(updatedFields)
    .eq("id", user.id)
    .select("*")
    .single();
    return {data, error};
}