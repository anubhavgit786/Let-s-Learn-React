import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export const useBookings = ()=>
{
    const { isLoading, isError, isSuccess, data:bookings, error } = useQuery({ queryKey: ["bookings"], queryFn: getBookings });
    return { isLoading, isError, isSuccess, bookings, error };
}