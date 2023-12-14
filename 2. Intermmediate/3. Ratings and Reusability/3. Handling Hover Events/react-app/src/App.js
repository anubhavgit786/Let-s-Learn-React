import React from "react";
import StarRating from "./StarRating";

const App = ()=>
{
    return (
        <>
        <StarRating maxRating={5}/>
        <StarRating maxRating={10}/>
        <StarRating/>
        </>
    )
}

export default App;
