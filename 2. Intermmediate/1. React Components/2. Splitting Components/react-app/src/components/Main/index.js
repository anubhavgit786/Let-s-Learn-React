import React from "react";
import WatchedBox from "./WatchedBox";
import ListBox from "./ListBox";

//Structural Component
const Main = ()=>
{
  return (
  <main className="main">
    <ListBox/>
    <WatchedBox/>
  </main>)
}

export default Main;