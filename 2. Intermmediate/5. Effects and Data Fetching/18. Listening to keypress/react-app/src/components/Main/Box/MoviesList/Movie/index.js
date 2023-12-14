import React, { useState } from "react";


//Presentational Component

const Movie = ({ imdbID, Poster:poster, Title, Year, onSelectMovie })=>
{
  const [posterExists, setPosterExists] = useState(true);
  const handlePosterError = () => 
  {
    setPosterExists(false); // Image loading resulted in an error
  }
  return (
  <li onClick={()=> onSelectMovie(imdbID) } style={{ cursor: "pointer" }}>
    { posterExists && poster !== 'N/A' ? (<img src={poster} alt={`movie ${Title}`} onError={handlePosterError} />): (<img src="/images/altPoster.png" alt={`movie ${Title}`}/>)}
    <h3>{Title}</h3>
    <div>
      <p>
        <span>{Year}</span>
      </p>
    </div>
  </li>)
}

export default Movie;