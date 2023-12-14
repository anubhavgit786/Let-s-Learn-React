import React from 'react';

const Item = ({ item, handleClick }) => 
{
  return (
    <li key={item.id}>
        <button onClick={() => handleClick(item.id)}>
            {item.text}
        </button>
    </li>
  )
}

export default Item

