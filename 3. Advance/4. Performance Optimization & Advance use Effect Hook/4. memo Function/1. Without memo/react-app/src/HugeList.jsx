import React, { useState } from 'react'

const HugeList = ({ show }) => 
{
    const items = Array.from({ length: 20000 }, () => "Item");
    const [showPosts, setShowPosts] = useState(show);
    
    return <>
    <button onClick={()=> setShowPosts((s)=> !s)}>{showPosts ? "Hide Posts" : "Show Posts"}</button>
    { showPosts && 
      (<ul>
        {items.map((item, index) => (
          <li key={index}>{`${item} ${index}`}</li>
        ))}
      </ul>
    )}</>;
}

export default HugeList


