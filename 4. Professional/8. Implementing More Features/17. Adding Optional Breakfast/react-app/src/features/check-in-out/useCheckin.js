import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from 'react-router-dom';

export const useCheckin = ()=>
{
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleUpdateBookingSuccess = (data)=>
    {
      toast.success(`Booking #${data.id} checked-in successfully`);
      //queryClient.invalidateQueries({ queryKey: ["booking", data.id] });
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    }
  
    const handleUpdateBookingError = (error)=>
    {
      toast.error("There was an error while checking in");
    }
  
    const {isLoading:isChecking, mutate:checkin } =  useMutation({ mutationFn: ({id, breakfast})=> updateBooking(id, { ...breakfast, status: "checked-in", isPaid: true }), onSuccess: handleUpdateBookingSuccess, onError: handleUpdateBookingError  })

    return { isChecking, checkin };
}