import React from 'react';
import WatchedMovie from "./WatchedMovie";


//Presentational Component
const WatchedMoviesList = ({watched, onDeleteWatched})=>
{
  return ( 
  <ul className="list">{watched.map((movie) => (<WatchedMovie key={movie.imdbID} {...movie} onDeleteWatched={onDeleteWatched}/>))}</ul>);
}

export default WatchedMoviesList;
