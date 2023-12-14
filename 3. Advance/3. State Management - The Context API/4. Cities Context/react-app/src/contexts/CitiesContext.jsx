import React, { createContext } from 'react';
import { useCities } from '../hooks/useCities';

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => 
{
    const { cities, isLoading, error } = useCities();

  return (<CitiesContext.Provider value={{ cities, isLoading, error }}>{children}</CitiesContext.Provider>);
}

export { CitiesProvider };