import { useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { initialItems } from "./utilities";

const App = ()=>
{
  const [items, setItems] = useState(initialItems);

  const handleAddItems = (item) => 
  {
    setItems((previousItems)=> [...previousItems, item]);
  }

  const handleRemoveItem = (id) =>
  {
    setItems((previousItems)=> previousItems.filter(item=> item.id !== id));
  }

  const handleToggleItem = (id) =>
  {
    setItems((previousItems)=> previousItems.map(item=> (item.id === id ? { ...item, packed: !item.packed} : item)));
  }

  const handleClearItems = ()=>
  {
    const confirmed = window.confirm('Are you sure you want to delete all items?');
    if (confirmed)
    {
      setItems([]);
    }
    
  }

  return (
  <div className="app">
    <Logo/>
    <Form onAddItems={handleAddItems}/>
    <PackingList items={items} onRemoveItem={handleRemoveItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems}/>
    <Stats items={items}/>
  </div>);
}

export default App;


