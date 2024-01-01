import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() 
{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const onLoginSuccess = (data)=>
    {
        queryClient.setQueryData(['user'], data.user);
        navigate('/dashboard', { replace: true });
    }

    const onLoginError = (error)=>
    {
        console.log('ERROR', error.message);
        toast.error('Provided email or password are incorrect : ' + error.message);
    }
    
    const { mutate: login, isLoading } = useMutation({ mutationFn: ({ email, password }) => loginApi({ email, password }), onSuccess: onLoginSuccess, onError: onLoginError, });
    
    return { login, isLoading };
}