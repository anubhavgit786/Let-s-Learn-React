import React from 'react'
import Star from './Star'

const conatinerStyle = { display : "flex", alignItems: "center", gap: "16px" };
const starConatinerStyle = { display : "flex", gap: "4px" };
const textStyle = { lineHeight: "1", margin : "0" };

const StarRating = ({ maxRating=5 }) => 
{
    
  return (
    <div style={conatinerStyle}>
      <div style={starConatinerStyle}>{ Array.from({ length: maxRating}, (_, idx)=> (<Star idx={idx+1}/>))}</div>
      <p style={textStyle}>10</p>
    </div>
  )
}

export default StarRating

