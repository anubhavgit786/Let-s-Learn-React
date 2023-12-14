import React from "react";
import Movie from "./Movie"; 



//Stateful Component

const MoviesList = ({ movies, onSelectMovie })=>
{
  return (<ul className="list list-movies">{movies?.map((movie) => (<Movie {...movie} key={movie.imdbID} onSelectMovie={onSelectMovie} /> ))}</ul>)
}

export default MoviesList;