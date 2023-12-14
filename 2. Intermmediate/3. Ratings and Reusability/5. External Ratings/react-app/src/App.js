import React, { useState } from "react";
import StarRating from "./StarRating";

const Test = ()=>
{
    const [movieRating, setMovieRating] = useState(0);
    return (
    <div>
         <StarRating maxRating={10} color="blue" onSetMovieRating={setMovieRating}/>
         <p>This movie is rated { movieRating } stars</p>
    </div>)
}

const App = ()=>
{
    return (
        <>
        <StarRating/>
        <StarRating maxRating={5}/>
        <StarRating maxRating={10}/>
        <Test/>
        <StarRating size={72} color="red"/>
        <StarRating size={72} color="red" messages={["Poor", "Okay", "Good", "Very Good", "Awesome"]}/>
        <StarRating size={72} color="red" messages={["Poor", "Okay", "Good", "Very Good", "Awesome"]} defaultRating={3}/>
        </>
    )
}

export default App;
