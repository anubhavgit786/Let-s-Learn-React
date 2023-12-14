import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Chargers", quantity: 2, packed: false },
];

const percentage = (num,total)=>
{
  const percentage = (num/total)*100
  return percentage.toFixed(2);
}

const Logo = ()=>
{
  return (<h1>🌴Far Away💼🎒</h1>);
}

const Form = ({  onAddItems })=>
{
  const initialState = { id: Date.now(), description: "", quantity: 1, packed: false };
  const [item, setItem] = useState(initialState);
  
  const { description, quantity} = item;
  const Options = Array.from({ length: 20}, (_, idx)=> idx+1);

  const handleInputChange = (e)=>
  {
    const { name, value } = e.target;
    if(name === "description" && value === "")
    {
      return;
    }

    setItem((previousItem)=> ({ ...previousItem, [name]: value })); // computed property
  }

  const handleSubmit = (e)=>
  {
    e.preventDefault();
    if(!description)
    {
      return;
    }
    onAddItems(item);
    setItem(initialState);
  }

  return (
  <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your 😍 trip?</h3>
    <select name="quantity" value={quantity} onChange={handleInputChange}>
      {Options.map((val)=> <option key={val} value={val}>{val}</option>)}
    </select>
    <input type="text" name="description" placeholder="Item..." value={description} onChange={handleInputChange} />
    <button>Add</button>
  </form>);
}

const Item = ({ id, description, quantity, packed, onRemoveItem, onToggleItem })=>
{
  return (
  <li>
    <input type="checkbox" checked={packed} onChange={() => onToggleItem(id)} />
    <span className={packed ? "listItem" : ""}>{quantity} {description}</span>
    <button onClick={()=> onRemoveItem(id) }>❌</button>
  </li>)
}

const PackingList = ({ items, onRemoveItem, onToggleItem, onClearItems })=>
{
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if(sortBy === 'input')
  {
    sortedItems = items;
  }

  if(sortBy=== 'description')
  {
    sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  }

  if(sortBy === 'packed')
  {
    sortedItems = items.slice().sort((a,b) => Number(a.packed)-Number(b.packed));
  }

  return(
  <div className="list">
    <ul>
    { sortedItems.map((item)=> <Item {...item} key={item.id} onRemoveItem={onRemoveItem} onToggleItem={onToggleItem} /> )}
    </ul>
    <div className="actions">
      <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button onClick={onClearItems}>Clear List</button>
    </div>
  </div>)
}

const Stats = ({ items })=>
{
  const numItems = items.length;
  const numPackedItems = items.filter((item)=> item.packed).length;
  const percentagePackedItems = percentage(numPackedItems, numItems);
  if(numItems === 0)
  {
    return (
    <footer className="stats">
      <em>Start adding some items to your packing list. 🚀</em>
    </footer>);
  } 
  return (
  <footer className="stats">
   { parseInt(percentagePackedItems) === 100 ? (<em>You got everything ready to go. ✈️</em>) : (<em>💼You have {numItems} items in your list and you already packed {numPackedItems} ({percentagePackedItems}%)</em>)}
  </footer>)
}


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


