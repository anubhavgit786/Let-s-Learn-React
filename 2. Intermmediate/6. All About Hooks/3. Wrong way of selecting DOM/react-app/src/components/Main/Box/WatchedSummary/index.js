import React from 'react';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


//Presentational Component

const WatchedSummary = ({ watched })=>
{
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (  
  <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{Math.round(avgImdbRating*10)/10}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{Math.round(avgUserRating*10)/10}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{Math.round(avgRuntime)} min</span>
      </p>
    </div>
  </div>);
}

export default WatchedSummary;