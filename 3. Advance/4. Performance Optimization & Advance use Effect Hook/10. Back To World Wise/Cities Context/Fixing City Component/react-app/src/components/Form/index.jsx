// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import React, { useState } from "react";
import styles from "./styles.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button";
import BackButton from "../BackButton";
import Spinner from "../Spinner";
import Message from "../Message";
import DatePicker from "react-datepicker";

import { useURLPosition } from "../../hooks/useURLPosition";
import { useCity } from "../../hooks/useCity";
import { useCities } from "../../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const Form = ()=> 
{
  const [lat, lng] = useURLPosition();
  const { isLoading: isLoadingGeocoding, cityName, country, setCityName, emoji, error: geoCodingError } = useCity(lat, lng);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { addCity, isLoading: isSubmissionLoading, error: submissionError } = useCities();
  const navigate = useNavigate();

  const handleSubmit = async (e)=>
  {
    e.preventDefault();

    if(!cityName || !date)
    {
      return;
    }

    const newCity = {cityName, country, emoji, date, notes, position : { lat, lng }};
    await addCity(newCity);
    navigate("/app/cities");
  }


  return (
    <form className={ `${styles.form} ${isSubmissionLoading ? styles.loading : "" }` } onSubmit={handleSubmit}>
      {isLoadingGeocoding && <Spinner/> }
      { !isLoadingGeocoding && !geoCodingError && (  
      <>
      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="countryName">Country</label>
        <input id="countryName" value={country} readOnly/>
        <span className={styles.flag} style={{ color: "black"}}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes}/>
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton/>
      </div>
      </>)}
      { geoCodingError && <Message message={geoCodingError} /> }
    </form>
  );
}

export default Form;
