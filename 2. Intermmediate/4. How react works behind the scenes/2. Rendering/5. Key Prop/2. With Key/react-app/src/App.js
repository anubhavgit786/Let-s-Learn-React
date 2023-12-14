import { useState } from "react";

import { initialFriends } from "./utilities";
import Button from "./components/Button";
import SplitBillForm from "./components/SplitBillForm";
import AddFriendForm from "./components/AddFriendForm";
import FriendList from "./components/FriendList";



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
    { selectedFriend && (<SplitBillForm friend={selectedFriend} onSplitBill={handleSplitBill} key={selectedFriend.id} />)}
  </div>);
}

export default App;
