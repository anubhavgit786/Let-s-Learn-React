import supabase, { supabaseUrl } from "./supabase";

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

export const createCabin = async (newCabin)=>
{   
    //1. create a new cabin 
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    
    //https://jhroaxzktdjrgodrcohz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2023-12-09T21%3A36%3A33.492Z
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { data:cabinData, error } = await supabase.from('cabins').insert([{...newCabin, image: imagePath }]);
    
    if(error)
    {
        throw new Error("Cabin could not be created");
    }

    //2. Upload the image on the supabase

    const { data:imageData, error: imageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image, { upsert: true, contentType: 'image/jpeg' })

    if(imageError)
    {
        await supabase.from('cabins').delete().eq('id', cabinData.id);
        throw new Error("Cabin Image could not be uploaded");
    }

    const data = { cabinData, imageData };
    return data;
}