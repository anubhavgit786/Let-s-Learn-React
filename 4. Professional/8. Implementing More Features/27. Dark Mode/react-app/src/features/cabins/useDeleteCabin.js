import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';



export const useDeleteCabin = ()=>
{
    const queryClient = useQueryClient();

    const handleDeleteCabinSuccess = ()=>
    {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    }
  
    const handleDeleteCabinError = (error)=>
    {
      toast.error(error.message);
    }
  
    const {isLoading:isDeleting, mutate:onDeleteCabin } =  useMutation({ mutationFn: deleteCabin, onSuccess: handleDeleteCabinSuccess, onError: handleDeleteCabinError  });

    return { isDeleting, onDeleteCabin };
}