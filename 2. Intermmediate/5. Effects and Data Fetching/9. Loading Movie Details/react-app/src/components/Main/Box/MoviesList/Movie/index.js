import React from "react";


//Presentational Component

const Movie = ({ imdbID, Poster:poster, Title, Year, onSelectMovie })=>
{
  return (
  <li onClick={()=> onSelectMovie(imdbID) } style={{ cursor: "pointer" }}>
    <img src={poster === "N/A" ? "/images/altPoster.png" : poster} alt={`${Title} poster`} />
    <h3>{Title}</h3>
    <div>
      <p>
        <span>{Year}</span>
      </p>
    </div>
  </li>)
}

export default Movie;