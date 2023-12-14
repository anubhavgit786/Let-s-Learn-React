import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { formatDate } from "../../utilities";
import { useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import Spinner from "../Spinner";
import BackButton from "../BackButton";

const City = ()=> 
{
  const { cityId } = useParams();
  const { currentCity, fetchCity, isLoading, error }= useCities();
  
  useEffect(()=>
  {
    fetchCity(cityId);

  }, [cityId])

  const { cityName, emoji, date, notes } = currentCity;

  return (
  <>
  { isLoading && (<Spinner/>)}
  { !isLoading && !error && (  <div className={styles.city}>
    <div className={styles.row}>
      <h6>City name</h6>
      <h3>
        <span>{emoji}</span> {cityName}
      </h3>
    </div>

    <div className={styles.row}>
      <h6>You went to {cityName} on</h6>
      <p>{formatDate(date || null)}</p>
    </div>

    {notes && (
      <div className={styles.row}>
        <h6>Your notes</h6>
        <p>{notes}</p>
      </div>
    )}

    <div className={styles.row}>
      <h6>Learn more</h6>
      <a
        href={`https://en.wikipedia.org/wiki/${cityName}`}
        target="_blank"
        rel="noreferrer"
      >
        Check out {cityName} on Wikipedia &rarr;
      </a>
    </div>

    <div>
      <BackButton/>
    </div>
  </div>)}
  { error &&  (<h4>💀{error}💀</h4>)  }
  </>);
}

export default City;
