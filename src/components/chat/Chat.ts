import { Component } from "../../lib/Component";
import {auth, firestore} from "../../../Firebase";

const datas = require("../../../mockData.json");

class Chat extends Component {
  chat: any;
  router: any;
  friend: any;
  room: any;

  constructor(parent, chat, room, friend, router) {
    super(parent);
    this.chat = chat;
    this.router = router;
    this.friend = friend;
    this.room = room;
  }
  
  mount() {
    document.getElementById(`${this.chat.id}`).addEventListener("click", () => {
      if (this.room.unreadMessage !== "0") {
        firestore.collection("users").doc(auth.currentUser.uid).collection("rooms").doc(this.room.id).update({"unreadMessage" : 0}).catch(err=>console.log(err.message))
      }
      this.router.setData(this.chat);
      this.router.push("/room");
    });
  }
  
  render() {
    return `
    <div class="chatRoom" id="${this.room.id}">
        <div class="imageContainer">
            <img src="${this.friend.profileImg ? this.friend.profileImg : "./public/images/profile.jpg"}" />
        </div>
        <div class="roomContent">
            <span class="roomTitle">${this.friend.nickname}</span>
            <span class="chatContent">${this.room.recentMessage}</span>
        </div>
        <div class="roomInfo">
            <span class="time">${this.room.hour}:${this.room.minute}</span>
            ${
              this.room.unreadMessage
                ? `<span class="unread">${this.room.unreadMessage}</span>`
                : ``
            }
        </div>
    </div>
        `;
  }
}

export { Chat };
