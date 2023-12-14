import React from 'react'

//Presentational Component
const NumResults = ({ movies })=>
{
  return (<p className="num-results">Found <strong>{ movies?.length }</strong> results</p>);
}

export default NumResults;
