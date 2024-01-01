import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignup = ()=> 
{
    const onSuccess = (user)=>
    {
        toast.success("Account successfully created! Please verify the new account from the user's email address.");
    }

    const onError = (error)=>
    {
        toast.error(error.message);
    }

    const { mutate: signup, isLoading } = useMutation({ mutationFn: signupApi, onSuccess, onError });
    
    return { signup, isLoading };
}
