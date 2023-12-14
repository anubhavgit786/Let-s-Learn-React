const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Chargers", quantity: 2, packed: false },
];

const Logo = ()=>
{
  return (<h1>🌴Far Away💼🎒</h1>);
}

const Form = ()=>
{
  const Options = Array.from({ length: 20}, (_, idx)=> idx+1);

  const handleSubmit = (e)=>
  {
    e.preventDefault();
    
  }

  return (
  <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your 😍 trip?</h3>
    <select>
      {Options.map((val)=> <option key={val} value={val}>{val}</option>)}
    </select>
    <input type="text" placeholder="Item..." />
    <button>Add</button>
  </form>);
}

const Item = ({ id, description, quantity, packed })=>
{
  return (
  <li>
    <span className={packed && "listItem"}>{quantity} {description}</span>
    <button>❌</button>
  </li>)
}

const PackingList = ()=>
{
  return(
  <div className="list">
    <ul>
    { initialItems.map((item)=> <Item {...item} key={item.id}/> )}
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
  return (
  <div className="app">
    <Logo/>
    <Form/>
    <PackingList/>
    <Stats/>
  </div>);
}

export default App;
