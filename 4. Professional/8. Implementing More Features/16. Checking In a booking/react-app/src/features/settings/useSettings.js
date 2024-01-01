import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export const useSettings = ()=>
{
    const { isLoading, isError, isSuccess, data:settings, error } = useQuery({ queryKey: ["settings"], queryFn: getSettings });
    return { isLoading, isError, isSuccess, settings, error };
}