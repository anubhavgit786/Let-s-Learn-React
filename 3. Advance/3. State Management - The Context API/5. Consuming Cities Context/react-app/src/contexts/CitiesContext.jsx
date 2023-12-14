import React, { createContext, useEffect, useState, useContext } from 'react';


const BASE_URL = `http://localhost:8000`;

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => 
{
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>
  {
    const controller = new AbortController();
    const fetchCities = async () =>
    {
      try 
      {
        setError("");
        setIsLoading(true);
        

        const res = await fetch(`${BASE_URL}/cities`, { signal: controller.signal });

        if(!res.ok && res.status !== 200)
        {
          throw new Error("Something went wrong with fetching cities");
        }
        const data = await res.json();
        if(data.Response === 'False')
        {
          throw new Error(data.Error)
        }
        setCities(data); 
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

    fetchCities();

    return ()=>
    {
      controller.abort();
    }
  }, []);

  return (<CitiesContext.Provider value={{ cities, isLoading, error }}>{children}</CitiesContext.Provider>);
}

const useCities = ()=>
{
  const context = useContext(CitiesContext);
  if(context === undefined)
  {
    throw new Error("CitiesContext is used outside of the CitiesProvider");
  }

  return context; //{ cities, isLoading, error }
}

export { CitiesProvider, useCities };