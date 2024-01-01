import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export const useLogout  = ()=> 
{
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSuccess = ()=>
  {
    queryClient.removeQueries();
    toast.success(`User logged-out successfully`);
    navigate("/login", { replace: true });
  }

  const onError = (error)=>
  {
    toast.error(error.message);
  }

  const { mutate: logout, isLoading } = useMutation({ mutationFn: logoutApi, onSuccess, onError });

  return { logout, isLoading };
}
