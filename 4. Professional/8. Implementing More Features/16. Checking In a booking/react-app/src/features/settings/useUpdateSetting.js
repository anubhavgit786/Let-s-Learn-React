import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export const useUpdateSetting = ()=>
{
    
    const queryClient = useQueryClient();

    const handleEditSettingSuccess = ()=>
    {
      toast.success("Setting edited successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    }
  
    const handleEditSettingError = (error)=>
    {
      toast.error(error.message);
    }
  
    const {isLoading:isUpdating, mutate:updateSetting } =  useMutation({ mutationFn: updateSettingAPI, onSuccess: handleEditSettingSuccess, onError: handleEditSettingError  })

    return { isUpdating, updateSetting };
}