import { createClient } from '@/utils/supabase/client'


export default async function updatePassword(password: string){
    const supabase = createClient();
    const {data, error} = await supabase.auth.updateUser({ password: password });

    return {data, error};

}
