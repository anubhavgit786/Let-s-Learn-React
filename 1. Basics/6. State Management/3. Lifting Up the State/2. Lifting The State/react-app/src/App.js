import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Chargers", quantity: 2, packed: false },
];

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

const Item = ({ description, quantity, packed })=>
{
  return (
  <li>
    <span className={packed ? "listItem" : ""}>{quantity} {description}</span>
    <button>❌</button>
  </li>)
}

const PackingList = ({ items })=>
{
  return(
  <div className="list">
    <ul>
    { items.map((item)=> <Item {...item} key={item.id}/> )}
    </ul>
  </div>)
}

const Stats = ()=>
{
  return (
  <footer className="stats">
   <em>
    💼You have x items in your list and you already packed x (X%)
   </em>
  </footer>)
}


const App = ()=>
{
  const [items, setItems] = useState(initialItems);

  const handleAddItems = (item) => 
  {
    setItems((previousItems)=> [...previousItems, item]);
  }

  return (
  <div className="app">
    <Logo/>
    <Form onAddItems={handleAddItems}/>
    <PackingList items={items}/>
    <Stats/>
  </div>);
}

export default App;


