import React from "react";


//Presentational Component

const Movie = ({ imdbID, Poster, Title, Year, idx })=>
{
  return (
  <li>
    <img src={Poster} alt={`${Title} poster`} />
    <h3>{Title}</h3>
    <div>
      <p>
        <span>{idx}</span><span>{Year}</span>
      </p>
    </div>
  </li>)
}

export default Movie;