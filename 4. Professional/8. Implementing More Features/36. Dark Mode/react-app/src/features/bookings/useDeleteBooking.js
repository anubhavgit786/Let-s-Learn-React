import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';

export const useDeleteBooking = ()=>
{
    const queryClient = useQueryClient();

    const handleDeleteBookingSuccess = ()=>
    {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  
    const handleDeleteBookingError = (error)=>
    {
      toast.error(error.message);
    }
  
    const {isLoading:isDeleting, mutate:onDeleteBooking } =  useMutation({ mutationFn: deleteBooking, onSuccess: handleDeleteBookingSuccess, onError: handleDeleteBookingError  });

    return { isDeleting, onDeleteBooking };
}