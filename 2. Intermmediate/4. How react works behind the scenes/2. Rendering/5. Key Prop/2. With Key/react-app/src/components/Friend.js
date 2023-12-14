import React from 'react';

import Button from './Button';

const Friend = ({ friend,  onSelection, selectedFriend }) =>
{
  const { name, image, balance } = friend;
  const isSelected = JSON.stringify(friend) === JSON.stringify(selectedFriend);
  return (
  <li className={ isSelected ? "selected" : ""}>
    <img src={image} alt={name} />
    <h3>{name}</h3>
    {balance < 0 && (<p className="red">You owe {name} {Math.abs(balance)}{" ₹"}</p>)}
    {balance > 0 && (<p className="green">{name} owe you {balance}{" ₹"}</p>)}
    {balance === 0 && (<p>You and {name} are even.</p>)}
    <Button onClick={()=> onSelection(friend) }>{ isSelected ? "Close"  : "Select" }</Button>
  </li>)
}

export default Friend;