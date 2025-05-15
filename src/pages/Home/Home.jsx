import React from "react";
import GroupList from "../../components/HomeComponent/GroupList";
import Friends from "../../components/HomeComponent/Friends";
import UserList from "../../components/HomeComponent/UserList";
import FriendRequest from "../../components/HomeComponent/FriendRequest";
import Group from "../../components/HomeComponent/Group";
import BlockList from "../../components/HomeComponent/BlockList";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-between items-start m-2">
      <div className="w-[400px]">
        <GroupList />
      </div>
      <div className="w-[300px]">
        <Friends />
      </div>
      <div className="w-[300px]">
        <UserList />
      </div>
     <div className="w-[400px]">
        <FriendRequest />
      </div>
     <div className="w-[300px]">
        <Group />
      </div>
    <div className="w-[300px]">
        <BlockList />
      </div>
     
      
    </div>
  );
};

export default Home;
