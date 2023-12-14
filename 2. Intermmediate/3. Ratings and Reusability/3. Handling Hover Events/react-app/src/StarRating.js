import React, { useState } from 'react'
import Star from './Star'

const conatinerStyle = { display : "flex", alignItems: "center", gap: "16px" };
const starConatinerStyle = { display : "flex" };
const textStyle = { lineHeight: "1", margin : "0" };

const StarRating = ({ maxRating=5 }) => 
{
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div style={conatinerStyle}>
      <div style={starConatinerStyle}>{ Array.from({ length: maxRating}, (_, idx)=> (<Star key={idx}  
      onRate={()=> setRating(idx + 1)}
      onHoverIn={()=> setHoverRating(idx + 1)}
      onHoverOut={()=> setHoverRating(0)} 
      full={hoverRating ? hoverRating >= idx + 1 : rating >= idx + 1} />))}
      </div>
      <p style={textStyle}>{hoverRating || ""}</p>
    </div>
  )
}

export default StarRating;

