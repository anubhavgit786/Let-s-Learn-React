import React, { createContext, useEffect, useContext, useReducer, useCallback } from 'react';
import { LOADING, ERROR, CITIES_LOADED, CITY_LOADED, CITY_CREATED, CITY_DELETED } from "./cityActions";


const BASE_URL = `http://localhost:8000`;

const CitiesContext = createContext();

const initialState = { cities: [], isLoading: false, error: "", currentCity: {},  };

const reducer = (state, action)=>
{
  switch(action.type)
  {
    case LOADING:
      return { ...state, isLoading: action.payload };
    case ERROR:
      return { ...state, error: action.payload };
    case CITIES_LOADED:
      return { ...state, cities: action.payload };
    case CITY_LOADED:
      return { ...state, currentCity: action.payload };
    case CITY_CREATED:
      return { ...state, cities: [...state.cities, action.payload ], currentCity: action.payload };
    case CITY_DELETED:
      return { ...state, cities: state.cities.filter((city)=> city.id !== action.payload), currentCity: {}};
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

const CitiesProvider = ({ children }) => 
{
  const [state, dispatch ] = useReducer(reducer, initialState);
  const { cities, isLoading, error, currentCity } = state;

  useEffect(()=>
  {
    const controller = new AbortController();
    const fetchCities = async () =>
    {
      try 
      {
        dispatch({ type: ERROR, payload: "" });
        dispatch({ type: LOADING, payload: true });
        

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

        dispatch({ type: CITIES_LOADED, payload: data });
        dispatch({ type: ERROR, payload: "" });
      } 
      catch (error) 
      {
        if(error.name !== "AbortError")
        {
          dispatch({ type: ERROR, payload: error.message });
        }
        
      }
      finally
      {
        dispatch({ type: LOADING, payload: false });
      }
    }

    fetchCities();

    return ()=>
    {
      controller.abort();
    }
  }, []);

  const fetchCity = useCallback( async (id) => 
  {
      if(Number(id) === currentCity.id)
      {
        return;
      }

      try 
      {
          dispatch({ type: ERROR, payload: "" });
          dispatch({ type: LOADING, payload: true });
          
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          if (!res.ok) 
          {
              throw new Error("Something went wrong with fetching city");
          }
          
          const data = await res.json();
          
          if (data.Response === "False") 
          {
              throw new Error("City not found");
          }
          
          dispatch({ type: CITY_LOADED, payload: data });
          dispatch({ type: ERROR, payload: "" });
      } 
      catch (error) 
      {
        dispatch({ type: ERROR, payload: error.message });
      } 
      finally 
      {
        dispatch({ type: LOADING, payload: false });
      }
  }, [currentCity.id]);

  const addCity = async (newCity) => 
  {
      try 
      {
          dispatch({ type: ERROR, payload: "" });
          dispatch({ type: LOADING, payload: true });
          
          const res = await fetch(`${BASE_URL}/cities`, 
          { 
            method: 'POST', 
            body: JSON.stringify(newCity), 
            headers: { 'Content-Type': 'application/json' }
          });

          if (!res.ok) 
          {
            // Check if the response status is not OK
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          
          const data = await res.json();
          dispatch({ type: CITY_CREATED, payload: data });
          dispatch({ type: ERROR, payload: "" });
      } 
      catch (error) 
      {
        dispatch({ type: ERROR, payload: error.message });
      } 
      finally 
      {
        dispatch({ type: LOADING, payload: false });
      }
  }

  
  const deleteCity = async (id) => 
  {
      try 
      {
          dispatch({ type: ERROR, payload: "" });
          dispatch({ type: LOADING, payload: true });
          
          const res = await fetch(`${BASE_URL}/cities/${id}`, 
          { 
            method: 'DELETE',  
          });

          if (!res.ok) 
          {
            // Check if the response status is not OK
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          dispatch({ type: CITY_DELETED, payload: id });
          dispatch({ type: ERROR, payload: "" });
      } 
      catch (error) 
      {
        dispatch({ type: ERROR, payload: error.message });
      } 
      finally 
      {
        dispatch({ type: LOADING, payload: false });
      }
  }

  return (<CitiesContext.Provider value={{ cities, isLoading, error, currentCity, fetchCity, addCity, deleteCity }}>{children}</CitiesContext.Provider>);
}

const useCities = ()=>
{
  const context = useContext(CitiesContext);
  if(context === undefined)
  {
    throw new Error("CitiesContext is used outside of the CitiesProvider");
  }

  return context;
}

export { CitiesProvider, useCities };