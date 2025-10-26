import { createClient } from '@/utils/supabase/client';

// allows the user to update/insert a profile picture

export default async function uploadProfileImg(file: File){
    const supabase = createClient();
    const { data: userData, error: authError } 
    = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user || authError){
         return {data: null, error: authError || new Error("User not authenticated")}; 
    }
    const { data, error} = await supabase
    .storage
    .from("avatar")
    .upload(`public/${user.id}-avatar.img`, file, {
        upsert: true,
        contentType: file.type
    });
    if (error){
        return error
    }
    return data.path
}