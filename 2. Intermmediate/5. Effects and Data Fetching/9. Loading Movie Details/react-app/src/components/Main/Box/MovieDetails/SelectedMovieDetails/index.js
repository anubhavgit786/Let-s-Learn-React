import React, { useState, useEffect } from 'react'
import { ColorRing } from  'react-loader-spinner';

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

const SelectedMovieDetails = ({ selectedId, onCloseMovie }) => 
{
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { Title:title, Year:year, Poster:poster, Runtime:runtime, imdbRating, Plot:plot, Released: released, Actors:actors, Director:director, Genre:genre  } = movie;
    
    useEffect(()=>
    {
      const fetchMovieDetails = async (id) =>
      {
        try 
        {
          setError("");
          setIsLoading(true);

          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`);

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
          setError(error.message);
        }
        finally
        {
          setIsLoading(false); 
        }
      }

      fetchMovieDetails(selectedId);
    }, [selectedId]);


    return (
    <>
    { isLoading &&  (<Loader />) }
    { !isLoading && !error && ( <><header>
        <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
        <img src={poster === "N/A" ? "/images/altPoster.png" : poster } alt={`movie ${title}`}/>
        <div className='details-overview'>
          <h2>{title}</h2>
          <p>{released || year} &bull; {runtime}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} IMDB Rating</p>
        </div>
      </header>
      <section>
        <p><em>{plot}</em></p>
        <p> Starring👉🏻 {actors}</p>
        <p> Directed by👉🏻 {director}</p>
      </section></>) }
      { error &&  (<ErrorMessage message={error}/>)  }
    </>
  )
}

export default SelectedMovieDetails;
