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
import SelectedMovieDetails from "./components/Main/Box/MovieDetails/SelectedMovieDetails";

import { Dna } from  'react-loader-spinner';

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
  //const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(()=>
  {
    const watched = JSON.parse(localStorage.getItem("watched")) || [];
    return watched;
  });
  const handleSelectMovie = (id)=>
  {
    setSelectedId((selectedId)=> selectedId === id ? null : id);
  }

  const handleCloseMovie = ()=>
  {
    setSelectedId(null);
  }

  const handleAddWatched = (movie)=>
  {
    setWatched((watched)=> [...watched, movie]);
    //localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  const handleDeleteWatched = (id)=>
  {
    setWatched((watched)=> watched.filter((movie)=> movie.imdbID !== id));
  }


  useEffect(()=>
  {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

 

  useEffect(()=>
  {
    const controller = new AbortController();
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

        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

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
        if(error.name !== "AbortError")
        {
          setError(error.message);
        }
        
      }
      finally
      {
        setIsLoading(false); 
      }
    }

    handleCloseMovie();
    fetchMovies();

    return ()=>
    {
      controller.abort();
    }
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
       { selectedId ? 
       (<MovieDetails>
          <SelectedMovieDetails  
            selectedId={selectedId} 
            onCloseMovie={handleCloseMovie} 
            onAddWatched={handleAddWatched}
            watched={watched}/> 
        </MovieDetails>) :  
        (<> 
          <WatchedSummary watched={watched}/> 
          <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/> 
        </>) 
        }
      </Box>
    </Main>
  </>);
}

export default App;
