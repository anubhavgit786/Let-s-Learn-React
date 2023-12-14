const Logo = ()=>
{
  return (<h1>🌴Far Away💼🎒</h1>);
}

const Form = ()=>
{
  return (
  <div className="add-form">
    <h3>What do you need for your 😍 trip?</h3>
  </div>);
}

const PackingList = ()=>
{
  return(
  <div className="list">

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
