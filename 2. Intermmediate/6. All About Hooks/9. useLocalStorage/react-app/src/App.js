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

import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { Dna } from  'react-loader-spinner';

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
  const [query, setQuery] = useState("interstellar");
  const { movies, isLoading, error } = useMovies(query);

  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "watched");
  const handleSelectMovie = (id)=>
  {
    setSelectedId((selectedId)=> selectedId === id ? null : id);
  }

  function handleCloseMovie()
  {
    setSelectedId(null);
  }

  const handleAddWatched = (movie)=>
  {
    setWatched((watched)=> [...watched, movie]);
  }

  const handleDeleteWatched = (id)=>
  {
    setWatched((watched)=> watched.filter((movie)=> movie.imdbID !== id));
  }

 

  
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
