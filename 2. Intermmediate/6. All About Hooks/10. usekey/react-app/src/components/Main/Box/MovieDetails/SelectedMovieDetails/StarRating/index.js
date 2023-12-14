import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Star from './Star'

const conatinerStyle = { display : "flex", alignItems: "center", gap: "16px" };
const starConatinerStyle = { display : "flex" };


const StarRating = ({ onSetMovieRating, maxRating=5, color="#fcc419",  size=48, className="", messages=[], defaultRating=0 }) => 
{
  const textStyle = { lineHeight: "1", margin : "0", color, fontSize: `${size/1.5}px` };
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleRating = (value)=>
  {
    setRating(value);
    if(onSetMovieRating)
    {
      onSetMovieRating(value);
    }
    //onSetMovieRating(value);
  }
  return (
    <div style={conatinerStyle} className={className}>
      <div style={starConatinerStyle}>{ Array.from({ length: maxRating}, (_, idx)=> (
      <Star key={idx}  
        onRate={()=> handleRating(idx + 1)}
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

StarRating.propTypes = 
{
  //onSetMovieRating: PropTypes.func, 
  //maxRating: PropTypes.number.isRequired, 
  maxRating: PropTypes.number,
  color: PropTypes.string,  
  size: PropTypes.number, 
  className: PropTypes.string, 
  messages: PropTypes.array,
  defaultRating : PropTypes.number 
}

export default StarRating;

