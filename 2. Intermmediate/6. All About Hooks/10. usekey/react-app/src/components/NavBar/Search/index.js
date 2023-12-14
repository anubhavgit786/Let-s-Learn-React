import React, { useRef } from 'react'
import { useKey } from "../../../hooks/useKey";

//Stateful Component
const Search = ({ query, setQuery })=>
{
  const inputEl = useRef(null);
  const handleFocus = ()=>
  {
    if(document.activeElement === inputEl.current)
    {
      return;
    }
    
    inputEl.current.focus();
    setQuery("");
  }

  useKey("enter", "keydown", handleFocus);
  
  return (<input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} ref={inputEl} />);
}

export default Search;

