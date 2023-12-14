import { useEffect } from "react";

export const useKey = (key, event, action)=>
{
    useEffect(()=>
    {
      const callback = (e)=>
      {
        if(e.code.toLowerCase() === key.toLowerCase())
        {
          action();
        }
      }

      document.addEventListener(event, callback);

      return ()=>
      {
        document.removeEventListener(event, callback);
      }

    }, [action, key, event]);
}