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

  const handleAddFriend = (e)=>
  {
    e.preventDefault();
    onAddFriend(friend);
    setFriend(initialState);
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

const FriendList = ({friends, onSelection, selectedFriend })=>
{
  return (<ul>{friends.map((friend)=> <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />)}</ul>)
}

const App = ()=>
{
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriendForm = ()=>
  {
    setShowAddFriendForm((show)=> !show);
    setSelectedFriend(null);
  }

  const handleSelectedFriend = (friend)=>
  {
    setSelectedFriend((selectedFriend)=> JSON.stringify(friend) === JSON.stringify(selectedFriend) ? null : friend);
    setShowAddFriendForm(false);
  }

  const handleAddFriend = (friend)=>
  {
    setFriends((friends)=> [...friends, friend]);
    setShowAddFriendForm(false);
  }

  const handleSplitBill = (value)=>
  {
    setFriends((friends)=> friends.map((friend)=> friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value }: friend));
    setSelectedFriend(null);
  }

  return (
  <div className="app">
    <div className="sidebar">
    <FriendList friends={friends} onSelection={handleSelectedFriend} selectedFriend={selectedFriend} />
    { showAddFriendForm && (<AddFriendForm onAddFriend={handleAddFriend} />)}
    <Button onClick={handleAddFriendForm}>{ showAddFriendForm ? "Close"  : "Add Friend"}</Button>
    </div>
    { selectedFriend && (<SplitBillForm friend={selectedFriend} onSplitBill={handleSplitBill}/>)}
  </div>);
}

export default App;
