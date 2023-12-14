import React from "react";

const Item = ({ id, description, quantity, packed, onRemoveItem, onToggleItem })=>
{
  return (
  <li>
    <input type="checkbox" checked={packed} onChange={() => onToggleItem(id)} />
    <span className={packed ? "listItem" : ""}>{quantity} {description}</span>
    <button onClick={()=> onRemoveItem(id) }>❌</button>
  </li>)
}

export default Item;