import React from "react";
import WatchedBox from "./WatchedBox";
import ListBox from "./ListBox";

//Structural Component
const Main = ({ movies })=>
{
  return (
  <main className="main">
    <ListBox movies={movies}/>
    <WatchedBox/>
  </main>)
}

export default Main;