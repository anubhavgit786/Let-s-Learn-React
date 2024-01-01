import supabase from "./supabase"

export const login = async ({ email, password }) =>
{
    //USER LOGIN
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) 
    {
        throw new Error(error.message);
    }
    
    return data;
}

