import React, { useState } from "react";

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

export default Form;