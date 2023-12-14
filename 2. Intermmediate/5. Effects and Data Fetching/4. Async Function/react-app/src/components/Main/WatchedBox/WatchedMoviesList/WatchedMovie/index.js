import React from 'react';

//Presentational Component

const WatchedMovie = ({ imdbRating, Poster, Title, userRating, runtime })=>
{
  return (    
  <li>
    <img src={Poster} alt={`${Title} poster`} />
    <h3>{Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime} mins</span>
      </p>
    </div>
  </li>)
}

export default WatchedMovie;