import React, { useState } from "react";
import "./Avatar.css";
import ListChat from "./listChat";
import Search from "./Search";
import AddFriend from "./AddFriend";
export default function index() {
  return (
    <div>
      <div className="avatar">
        <div className="image">
          <img src="https://picsum.photos/200/300" />
        </div>
        <p class="title">Message</p>
        <div className="friends d-flex">
          <i class="fas fa-users"></i>
          <AddFriend />
        </div>
      </div>
      <Search />
      <ListChat />
    </div>
  );
}
