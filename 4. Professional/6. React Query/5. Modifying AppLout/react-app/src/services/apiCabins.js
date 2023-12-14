import supabase from "./supabase";

export const getCabins = async ()=>
{
    const { data , error } = await supabase.from('cabins').select('*');

    if(error)
    {
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export const deleteCabin = async (id)=>
{
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);

    if(error)
    {
        throw new Error("Cabin could not be deleted");
    }

    return data;
}