import React from 'react';

import Friend from './Friend';

const FriendList = ({friends, onSelection, selectedFriend })=>
{
  return (<ul>{friends.map((friend)=> <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />)}</ul>)
}

export default FriendList;