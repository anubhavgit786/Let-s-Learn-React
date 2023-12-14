import React, { useState } from "react";

import MoviesList from "./MoviesList";

//Stateful Component
const ListBox = ({ movies })=>
{
  
  const [isOpen1, setIsOpen1] = useState(true);
  return ( 
  <div className="box">
    <button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)}> {isOpen1 ? "–" : "+"}</button>
    {isOpen1 && (<MoviesList movies={movies}/>)}
  </div>)
}

export default ListBox;