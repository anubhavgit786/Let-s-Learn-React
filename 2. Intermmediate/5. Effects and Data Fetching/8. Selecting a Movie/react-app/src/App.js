import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Logo from "./components/NavBar/Logo";
import Search from "./components/NavBar/Search";
import NumResults from "./components/NavBar/NumResults";

import Main from "./components/Main";
import Box from "./components/Main/Box";
import MoviesList from "./components/Main/Box/MoviesList";
import WatchedMoviesList from "./components/Main/Box/WatchedMoviesList";
import WatchedSummary from "./components/Main/Box/WatchedSummary";
import MovieDetails from "./components/Main/Box/MovieDetails";

import { Dna } from  'react-loader-spinner';

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = `44397289`;

const Loader = ()=>
{
  return (
    <div className="loader">
       <Dna
    visible={true}
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
  />
    </div>
  );
}

const ErrorMessage = ({ message })=>
{
  return (
  <p className="error">
    <span>💀</span>{message}<span>💀</span>
  </p>);
}

//Structural Component
const App = ()=> 
{
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("interstellar");
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id)=>
  {
    setSelectedId((selectedId)=> selectedId === id ? null : id);
  }

  const handleCloseMovie = ()=>
  {
    setSelectedId(null);
  }

  useEffect(()=>
  {
    const fetchMovies = async () =>
    {
      try 
      {
        setError("");
        setIsLoading(true);
        if(query.length < 3)
        {
          throw new Error("Please type to search a movie");
        }

        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        console.log("Response is ", res);

        if(!res.ok && res.status !== 200)
        {
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await res.json();
        if(data.Response === 'False')
        {
          throw new Error(data.Error)
        }
        setMovies(data.Search); 
        setError("");
      } 
      catch (error) 
      {
        setError(error.message);
      }
      finally
      {
        setIsLoading(false); 
      }
    }

    fetchMovies();
  }, [query]);

  return (
  <>
    <NavBar>
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResults movies={movies}/>
    </NavBar>
    <Main>
      <Box>
        { isLoading &&  (<Loader />) }
        { !isLoading && !error && (<MoviesList movies={movies} onSelectMovie={handleSelectMovie}  />) }
        { error &&  (<ErrorMessage message={error}/>)  }
      </Box>
      <Box>
       { selectedId ? (<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} />) :  (<> <WatchedSummary watched={watched}/> <WatchedMoviesList watched={watched}/> </>) }
      </Box>
    </Main>
  </>);
}

export default App;
