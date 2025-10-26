import { createClient } from '@/utils/supabase/client';

export default function retrieveUserImage(path: string){
    const supabase = createClient();
    const { data } = supabase
    .storage
    .from('avatar')
    .getPublicUrl(path);

    return data.publicUrl;
}