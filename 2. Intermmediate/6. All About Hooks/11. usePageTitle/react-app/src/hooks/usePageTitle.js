import { useEffect } from "react";

export const usePageTitle = (title)=>
{
    useEffect(()=>
    {
      if(!title) return;

      document.title = `Movie | ${title}`;

      return ()=>
      {
        document.title = `usePopcorn Project`;
      }
      
    }, [title])

}