import React from 'react';
import WatchedMovie from "./WatchedMovie";


//Presentational Component
const WatchedMoviesList = ({watched})=>
{
  return ( 
  <ul className="list">{watched.map((movie) => (<WatchedMovie key={movie.imdbID} {...movie}/>))}</ul>);
}

export default WatchedMoviesList;
