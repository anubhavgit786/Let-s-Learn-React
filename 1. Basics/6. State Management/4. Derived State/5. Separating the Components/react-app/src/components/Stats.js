import React from "react";

import { percentage} from "../../src/utilities";

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

export default Stats;