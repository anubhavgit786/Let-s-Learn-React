import React from "react";


//Presentational Component

const Movie = ({ imdbID, Poster, Title, Year })=>
{
  return (
  <li>
    <img src={Poster} alt={`${Title} poster`} />
    <h3>{Title}</h3>
    <div>
      <p>
        <span>{Year}</span>
      </p>
    </div>
  </li>)
}

export default Movie;