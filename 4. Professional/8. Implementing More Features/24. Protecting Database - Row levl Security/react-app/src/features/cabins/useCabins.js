import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useCabins = ()=>
{
    const { isLoading, isError, isSuccess, data:cabins, error } = useQuery({ queryKey: ["cabins"], queryFn: getCabins });
    return { isLoading, isError, isSuccess, cabins, error };
}