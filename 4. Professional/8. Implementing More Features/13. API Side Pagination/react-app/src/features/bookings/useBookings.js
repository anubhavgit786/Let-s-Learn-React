import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = ()=>
{
    const [ searchParams ] = useSearchParams();
    const filterValue = searchParams.get('status');
    const filter = !filterValue || (filterValue === "all") ? null : { field: "status", value: filterValue };

    const sortByRaw = searchParams.get('sortBy') || "startDate-asc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };
    
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const { isLoading, isError, isSuccess, data:{ data: bookings, count } = {}, error } = useQuery({ queryKey: ["bookings", filter, sortBy, page], queryFn: ()=> getBookings({ filter, sortBy, page }) });
    return { isLoading, isError, isSuccess, bookings, count, error };
}