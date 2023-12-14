import React, { useState } from 'react';

import Button from './Button';

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

export default AddFriendForm;