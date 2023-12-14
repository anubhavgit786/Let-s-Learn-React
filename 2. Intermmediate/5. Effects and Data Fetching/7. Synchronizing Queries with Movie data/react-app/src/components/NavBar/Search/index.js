import React from 'react'

//Stateful Component
const Search = ({ query, setQuery })=>
{
  
  return (<input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)}/>);
}

export default Search;
