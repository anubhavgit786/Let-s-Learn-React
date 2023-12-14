import React from "react";
import Movie from "./Movie"; 



//Stateful Component

const MoviesList = ({ movies })=>
{
  return (<ul className="list">{movies?.map((movie) => (<Movie {...movie} key={movie.imdbID} /> ))}</ul>)
}

export default MoviesList;