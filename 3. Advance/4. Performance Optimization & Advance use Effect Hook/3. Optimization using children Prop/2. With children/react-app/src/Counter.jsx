import React, { useState } from 'react';

const Counter = ({ children}) => 
{
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <button onClick={() => setCount((count) => count + 1)}>+</button>
        <span>count is {count}</span>
        <button onClick={() => setCount((count) => count - 1)}>-</button>
        { children }
      </div>
    );
}

export default Counter;