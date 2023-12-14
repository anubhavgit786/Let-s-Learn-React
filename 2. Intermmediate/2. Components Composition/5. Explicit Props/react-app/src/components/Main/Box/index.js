import React, { useState } from "react";

//Stateful Component
const Box = ({ element })=>
{
  const [isOpen, setIsOpen] = useState(true);
  return ( 
  <div className="box">
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}> {isOpen ? "–" : "+"}</button>
    {isOpen && element }
  </div>)
}

export default Box;