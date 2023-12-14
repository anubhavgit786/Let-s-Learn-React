import { useEffect, useState } from "react";

const KEY = `44397289`;

export const useMovie = (id)=>
{
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    
    useEffect(()=>
    {
      const controller = new AbortController();
      const fetchMovieDetails = async (id) =>
      {
        try 
        {
          setError("");
          setIsLoading(true);

          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`, {signal: controller.signal });

          if(!res.ok && res.status !== 200)
          {
            throw new Error(`Something went wrong with fetching movie with imdbID: ${id}`);
          }

          const data = await res.json();
          
          if(data.Response === 'False')
          {
            throw new Error(data.Error)
          }

          setMovie(data); 
          setError("");
        } 
        catch (error) 
        {
          if(error.name !== "AbortError")
          {
            setError(error.message);
          }
          
        }
        finally
        {
          setIsLoading(false); 
        }
      }

      fetchMovieDetails(id);

      return ()=>
      {
        controller.abort();
      }
    }, [id]);

    return { movie, isLoading, error };

}