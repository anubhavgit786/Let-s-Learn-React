import React, { useState } from 'react'
import Star from './Star'

const conatinerStyle = { display : "flex", alignItems: "center", gap: "16px" };
const starConatinerStyle = { display : "flex" };


const StarRating = ({ maxRating=5, color="#fcc419",  size=48, className="", messages=[], defaultRating=0 }) => 
{
  const textStyle = { lineHeight: "1", margin : "0", color, fontSize: `${size/1.5}px` };
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div style={conatinerStyle} className={className}>
      <div style={starConatinerStyle}>{ Array.from({ length: maxRating}, (_, idx)=> (
      <Star key={idx}  
        onRate={()=> setRating(idx + 1)}
        onHoverIn={()=> setHoverRating(idx + 1)}
        onHoverOut={()=> setHoverRating(0)}
        color={color}
        size={size} 
        full={hoverRating ? hoverRating >= idx + 1 : rating >= idx + 1} />))}
      </div>
      <p style={textStyle}>{messages.length === maxRating ? messages[hoverRating ? hoverRating - 1: rating-1] : (hoverRating || "")   }</p>
    </div>
  )
}

export default StarRating;

