import React, { useState, useEffect } from 'react'
import { ColorRing } from  'react-loader-spinner';
import StarRating from "./StarRating";

const KEY = `44397289`;

const Loader = ()=>
{
  return (
    <div className="loader">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
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

const SelectedMovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => 
{
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [posterExists, setPosterExists] = useState(true);
    const [userRating, setUserRating] = useState(0);
    const isWatched = watched?.some((movie)=> movie.imdbID === selectedId);
    const watchedUserRating = watched.find((movie)=> movie.imdbID === selectedId)?.userRating;
    const { Title:title, Year:year, Poster:poster, Runtime:runtime, imdbRating, Plot:plot, Released: released, Actors:actors, Director:director, Genre:genre  } = movie;
    
    const handlePosterError = () => 
    {
      setPosterExists(false); // Image loading resulted in an error
    }

    const handleAdd = ()=>
    {
      const newMovie = 
      { 
        imdbID: movie.imdbID, 
        Title : movie.Title, 
        Year: movie.Year, 
        Poster: movie.Poster, 
        runtime: Number(movie.Runtime.split(' ')[0]), 
        imdbRating: Number(movie.imdbRating), 
        userRating,
      };

      onAddWatched(newMovie);
      onCloseMovie();
      
    }

    useEffect(()=>
    {
      const controller = new AbortController();
      const fetchMovieDetails = async (id) =>
      {
        try 
        {
          setError("");
          setIsLoading(true);

          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`, {signal: controller.signal });

          if(!res.ok && res.status !== 200)
          {
            throw new Error(`Something went wrong with fetching movie with imdbID: ${id}`);
          }

          const data = await res.json();
          
          if(data.Response === 'False')
          {
            throw new Error(data.Error)
          }

          setMovie(data); 
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

      fetchMovieDetails(selectedId);

      return ()=>
      {
        controller.abort();
      }
    }, [selectedId]);

    useEffect(()=>
    {
      if(!title) return;

      document.title = `Movie | ${title}`;

      return ()=>
      {
        document.title = `usePopcorn Project`;
      }
      
    }, [title])

    return (
    <>
    { isLoading &&  (<Loader />) }
    { !isLoading && !error && ( <><header>
        <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
        { posterExists && poster !== 'N/A' ? (<img src={poster} alt={`movie ${title}`} onError={handlePosterError} />): (<img src="/images/altPoster.png" alt={`movie ${title}`}/>)}
        <div className='details-overview'>
          <h2>{title}</h2>
          <p>{released || year} &bull; {runtime}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} IMDB Rating</p>
        </div>
      </header>
      <section>
        <div className='rating'>
          { !isWatched ? (     <><StarRating maxRating={10} size={24}  onSetMovieRating={setUserRating} />
          { userRating > 0 && (<button className='btn-add' onClick={handleAdd}>+ Add to List</button>) }</>) : (<p>You have already rated {watchedUserRating} ⭐</p>)}
        </div>
        <p><em>{plot}</em></p>
        <p> Starring👉🏻 {actors}</p>
        <p> Directed by👉🏻 {director}</p>
      </section></>) }
      { error &&  (<ErrorMessage message={error}/>)  }
    </>
  )
}

export default SelectedMovieDetails;
