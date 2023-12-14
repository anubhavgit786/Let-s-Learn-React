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

import { Dna } from  'react-loader-spinner'


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

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
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>
  {
    const fetchMovies = async () =>
    {
      try 
      {
        setIsLoading(true);
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=ssdsfef`);

        if(!res.ok && res.status !== 200)
        {
          throw new Error("Something went wrong with fetching movies")
        }

        const data = await res.json();
      
        if(data.Response === 'False')
        {
    
          throw new Error(data.Error)
        }
        
        setMovies(data.Search); 
     
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
  }, []);

  return (
  <>
    <NavBar>
      <Logo />
      <Search/>
      <NumResults movies={movies}/>
    </NavBar>
    <Main>
      <Box>
        { isLoading &&  <Loader /> }
        { !isLoading && !error && (<MoviesList movies={movies}/>) }
        { error &&  <ErrorMessage message={error}/>}
      </Box>
      <Box>
        <>
          <WatchedSummary watched={watched}/>
          <WatchedMoviesList watched={watched}/>
        </>
      </Box>
    </Main>
  </>);
}

export default App;
