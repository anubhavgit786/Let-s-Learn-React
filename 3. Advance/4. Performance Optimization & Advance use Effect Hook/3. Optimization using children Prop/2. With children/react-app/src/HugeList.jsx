import React from 'react'

const HugeList = () => 
{
    const items = Array.from({ length: 100000 }, () => "Item");
  
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{`${item} ${index}`}</li>
        ))}
      </ul>
    );
}

export default HugeList


