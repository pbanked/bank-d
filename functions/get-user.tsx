import { createClient } from "@/utils/supabase/client";

// gets the current user and returns their info in data
export default async function getCurrentUser(){
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user || error){
         return {data: null, error: new Error("User not authenicated")} 
    }
    const {data: userRow , error: rowError} = await supabase
    .from("user")
    .select("firstName, lastName, avatarUrl, email")
    .eq("id", user.id)
    .single();
    
    if (!userRow || rowError){
        return {data: null, error: new Error("User not found")} 
    }
    const firstName = userRow?.firstName;
    const lastName = userRow?.lastName;
    const avatarUrl = userRow?.avatarUrl;
    const email = userRow?.email;

    if (!firstName || !lastName || !avatarUrl || !email){
        return {data: null, error: new Error("User is missing data")};
    }
    return { data: {firstName, lastName, avatarUrl, email}, error: null}
   
}