import React, { useState, memo } from 'react'

const HugeList = memo(({ options }) => 
{
    const items = Array.from({ length: 20000 }, () => "Item");
    const [showPosts, setShowPosts] = useState(options.show);
    
    return <>
    <button onClick={()=> setShowPosts((s)=> !s)}>{showPosts ? "Hide Posts" : "Show Posts"}</button>
    
    { showPosts && 
    
      (<><h3>{options.title}</h3><ul>
        {items.map((item, index) => (
          <li key={index}>{`${item} ${index}`}</li>
        ))}
      </ul></>
    )}</>;
})

export default HugeList;


