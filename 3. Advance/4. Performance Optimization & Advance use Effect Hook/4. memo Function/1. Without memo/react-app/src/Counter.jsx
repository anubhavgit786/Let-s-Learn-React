import React, { useState } from 'react';
import HugeList from "./HugeList";

const Counter = () => 
{
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <button onClick={() => setCount((count) => count + 1)}>+</button>
        <span>count is {count}</span>
        <button onClick={() => setCount((count) => count - 1)}>-</button>
        <HugeList show={false}/>
      </div>
    );
}

export default Counter;