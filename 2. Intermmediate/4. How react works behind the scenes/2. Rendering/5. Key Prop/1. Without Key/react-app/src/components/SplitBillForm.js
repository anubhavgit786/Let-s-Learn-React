import React, { useState } from 'react';
import Button from "./Button";

const SplitBillForm = ({ friend, onSplitBill })=>
{
  const { name} = friend;
  const [bill, setBill] = useState("");
  const[paidByUser, setPaidByUser] = useState("");
  const [ whoIsPaying, setWhoIsPaying ] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : "";

  const handleSubmit = (e)=>
  {
    e.preventDefault();

    if(!bill || !paidByUser)
    {
      return;
    }

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);

  }

  return(
  <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split a bill with {name}</h2>
    <label>💰Bill Value</label>
    <input type="text" value={bill} onChange={(e)=> setBill(Number(e.target.value))} />
    <label>🧍🏻Your Expense</label>
    <input type="text"  value={paidByUser} onChange={(e)=> setPaidByUser((paidByUser)=> Number(e.target.value) > bill ? paidByUser :Number(e.target.value))} />
    <label>🕴🏻{name}'s Expense</label>
    <input type="text" value={paidByFriend} disabled/>
    <label>💵Who is paying the bill?</label>
    <select value={whoIsPaying} onChange={(e)=> setWhoIsPaying(e.target.value)}>
      <option value="user">You</option>
      <option value="friend">{name}</option>
    </select>
    <Button>Add</Button>
</form>)
}

export default SplitBillForm;