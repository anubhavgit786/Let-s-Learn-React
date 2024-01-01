import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from "../../services/apiCabins";

export const useCreateCabin = ()=>
{
    const queryClient = useQueryClient();

    const handleCreateCabinSuccess = ()=>
    {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    }
  
    const handleCreateCabinError = (error)=>
    {
      toast.error(error.message);
    }
  
    const {isLoading:isCreating, mutate:createCabin } =  useMutation({ mutationFn: createEditCabin, onSuccess: handleCreateCabinSuccess, onError: handleCreateCabinError  });

    return { isCreating, createCabin };
}