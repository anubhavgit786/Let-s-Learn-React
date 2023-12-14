import React from "react";
import StarRating from "./StarRating";

const App = ()=>
{
    return (
        <>
        <StarRating maxRating={5}/>
        <StarRating maxRating={10}/>
        <StarRating/>
        <StarRating size={72} color="red"/>
        <StarRating size={72} color="red" messages={["Poor", "Okay", "Good", "Very Good", "Awesome"]}/>
        <StarRating size={72} color="red" messages={["Poor", "Okay", "Good", "Very Good", "Awesome"]} defaultRating={3}/>
        </>
    )
}

export default App;
