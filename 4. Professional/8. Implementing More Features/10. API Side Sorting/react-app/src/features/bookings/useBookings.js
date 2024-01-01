import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = ()=>
{
    const [ searchParams ] = useSearchParams();
    const filterValue = searchParams.get('status');
    const sortByRaw = searchParams.get('sortBy') || "startDate-asc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };
    const filter = !filterValue || (filterValue === "all") ? null : { field: "status", value: filterValue };
    const { isLoading, isError, isSuccess, data:bookings, error } = useQuery({ queryKey: ["bookings", filter, sortBy], queryFn: ()=> getBookings({ filter, sortBy }) });
    return { isLoading, isError, isSuccess, bookings, error };
}