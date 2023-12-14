import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const Button = ({ children, onClick })=>
{
  return (<button className="button" onClick={onClick}>{children}</button>);
}

const SplitBillForm = ()=>
{
  return(
  <form className="form-split-bill">
    <h2>Split a bill with X</h2>
    <label>💰Bill Value</label>
    <input type="text"/>
    <label>🧍🏻Your Expense</label>
    <input type="text"/>
    <label>🕴🏻X's Expense</label>
    <input type="text" disabled/>
    <label>💵Who is paying the bill?</label>
    <select>
      <option value="you">You</option>
      <option value="friend">X</option>
    </select>
    <Button>Add</Button>
</form>)
}

const AddFriendForm = ({ onAddFriend })=>
{
  const initialState = { id : Date.now(), name : "", image: "https://i.pravatar.cc/48", balance: 0 };
  const [friend, setFriend] = useState(initialState);
  const { name, image } = friend;

  const handleChange = (e)=>
  {
    const { name, value } = e.target;
    if(name === "name" && value === "")
    {
      return;
    }

    setFriend((friend)=> ({...friend, [name]: value}));
  }

  const handleAddFriend = ()=>
  {
    onAddFriend(friend);
  }

  return (
  <form className="form-add-friend">
    <label>🧑‍🤝‍🧑Friend Name</label>
    <input type="text" name="name" value={name} onChange={handleChange} />
    <label>🤵🏻 Image URL</label>
    <input type="text" name="image" value={image} onChange={handleChange} />
    <Button onClick={handleAddFriend}>Add</Button>
  </form>)
}

const Friend = ({id, name, image, balance}) =>
{
  return (
  <li>
    <img src={image} alt={name} />
    <h3>{name}</h3>
    {balance < 0 && (<p className="red">You owe {name} {Math.abs(balance)}{" ₹"}</p>)}
    {balance > 0 && (<p className="green">{name} owe you {balance}{" ₹"}</p>)}
    {balance === 0 && (<p>You and your friend are even.</p>)}
    <Button>Select</Button>
  </li>)
}

const FriendList = ({friends})=>
{
  return (<ul>{friends.map((friend)=> <Friend {...friend} key={friend.id}/>)}</ul>)
}

const App = ()=>
{
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);

  const handleAddFriendForm = ()=>
  {
    setShowAddFriendForm((is)=> !is);
  }

  const handleAddFriend = (friend)=>
  {
    setFriends((friends)=> [...friends, friend]);
  }

  return (
  <div className="app">
    <div className="sidebar">
    <FriendList friends={friends} />
    { showAddFriendForm && (<AddFriendForm onAddFriend={handleAddFriend} />)}
    <Button onClick={handleAddFriendForm}>{ showAddFriendForm ? "Close"  : "Add Friend"}</Button>
    </div>
    <SplitBillForm/>
  </div>);
}

export default App;
