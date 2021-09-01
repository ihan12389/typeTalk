import { Component } from "../../lib/Component";
import {firestore} from "../../../Firebase";

const datas = require("../../../mockData.json");

class Chat extends Component {
  chat: any;
  router: any;
  friend: any;

  constructor(parent, chat, friend, router) {
    super(parent);
    this.chat = chat;
    this.router = router;
    this.friend = friend;
  }
  
  mount() {
    document.getElementById(`${this.chat.id}`).addEventListener("click", () => {
      this.router.setData(this.chat);
      this.router.push("/room");
    });
  }
  
  render() {
    return `
    <div class="chatRoom" id="${this.chat.id}">
        <div class="imageContainer">
            <img src="${this.friend.profileImg ? this.friend.profileImg : "./public/images/profile.jpg"}" />
        </div>
        <div class="roomContent">
            <span class="roomTitle">${this.friend.nickname}</span>
            <span class="chatContent">${this.chat.recentMessage}</span>
        </div>
        <div class="roomInfo">
            <span class="time">${this.chat.hour}:${this.chat.minute}</span>
            ${
              this.chat.unread
                ? `<span class="unread">${this.chat.unreadMessage}</span>`
                : ``
            }
        </div>
    </div>
        `;
  }
}

export { Chat };
