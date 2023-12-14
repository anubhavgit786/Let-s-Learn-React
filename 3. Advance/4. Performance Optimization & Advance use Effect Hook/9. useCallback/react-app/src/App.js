import React, { useState, useCallback } from 'react';
import Item from "./Item";

function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ]);

  const handleClick = useCallback((id) => {
    console.log('Clicking on item', id);
  }, [items]);

  return (
    <ul>
      {items.map((item) => (<Item key={item.id} handleClick={handleClick} item={item}/>))}
    </ul>
  );
};

export default App;
