import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = ()=>
{
    const queryClient = useQueryClient();
    const [ searchParams ] = useSearchParams();
    const filterValue = searchParams.get('status');
    const filter = !filterValue || (filterValue === "all") ? null : { field: "status", value: filterValue };

    const sortByRaw = searchParams.get('sortBy') || "startDate-asc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };
    
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const { isLoading, isError, isSuccess, data:{ data: bookings, count } = {}, error } = useQuery({ queryKey: ["bookings", filter, sortBy, page], queryFn: ()=> getBookings({ filter, sortBy, page }) });
    
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if(page < pageCount)
    {
        queryClient.prefetchQuery({ queryKey: ["bookings", filter, sortBy, page+1], queryFn: ()=> getBookings({ filter, sortBy, page: page+1 }) });
    }

    if(1 < page)
    {
        queryClient.prefetchQuery({ queryKey: ["bookings", filter, sortBy, page-1], queryFn: ()=> getBookings({ filter, sortBy, page: page-1 }) });
    }

    return { isLoading, isError, isSuccess, bookings, count, error };
}