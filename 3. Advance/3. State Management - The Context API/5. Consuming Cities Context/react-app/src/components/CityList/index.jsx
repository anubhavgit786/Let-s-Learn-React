import React from 'react';
import styles from "./styles.module.css";
import Spinner from "../Spinner";
import CityItem from "../CityItem";
import Message from "../Message";
import { useCities } from '../../contexts/CitiesContext';

const CityList = () => 
{
  const { cities, isLoading, error } = useCities();
  const message = "Add your first city by clicking on a city on the map."
  return (
    <>
    { isLoading &&  (<Spinner />) }
    { !isLoading && !error && cities.length !==0 &&(<ul className={styles.cityList}>{ cities.map((city)=> <CityItem key={city.id} city={city}/> )}</ul>) }
    { !isLoading && !error && cities.length ===0 &&(<Message message={message}/>) }
    { error &&  (<p>💀{error}💀</p>)  }
    </>
    )
}

export default CityList;