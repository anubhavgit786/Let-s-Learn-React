import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from "../../services/apiCabins";

export const useEditCabin = ()=>
{
    
    const queryClient = useQueryClient();

    const handleEditCabinSuccess = ()=>
    {
      toast.success("Exiusting cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    }
  
    const handleEditCabinError = (error)=>
    {
      toast.error(error.message);
    }
  
    const {isLoading:isEditing, mutate:editCabin } =  useMutation({ mutationFn: ({ newCabinData, id })=> createEditCabin(newCabinData, id), onSuccess: handleEditCabinSuccess, onError: handleEditCabinError  })

    return { isEditing, editCabin };
}