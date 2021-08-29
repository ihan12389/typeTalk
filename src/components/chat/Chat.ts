import { Component } from "../../lib/Component";

const datas = require("../../../mockData.json");

class Chat extends Component {
  chat: any;
  router: any;
  title: any;
  constructor(parent, chat, title, router) {
    super(parent);
    this.chat = chat;
    this.router = router;
    this.title = title;
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
            ${this.chat.friends
              .map((friend) => `<img src="${friend.profileImg ? friend.profileImg : "./images/profile.jpg" }" />`)
              .join("")}
        </div>
        <div class="roomContent">
            <span class="roomTitle">${this.title}</span>
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
