import { useState, useEffect } from "react";

export const useLocalStorage = (initialWatched, key)=>
{
    const [watched, setWatched] = useState(()=>
    {
      const watched = JSON.parse(localStorage.getItem(key)) || initialWatched;
      return watched;
    });

    useEffect(()=>
    {
      localStorage.setItem(key, JSON.stringify(watched));
    }, [watched, key]);

    return [watched, setWatched];
}