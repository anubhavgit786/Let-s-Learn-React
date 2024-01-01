import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = ()=>
{
    const [ searchParams ] = useSearchParams();
    const filterValue = searchParams.get('status');
    const filter = !filterValue || (filterValue === "all") ? null : { field: "status", value: filterValue };
    const { isLoading, isError, isSuccess, data:bookings, error } = useQuery({ queryKey: ["bookings"], queryFn: ()=> getBookings({ filter }) });
    return { isLoading, isError, isSuccess, bookings, error };
}