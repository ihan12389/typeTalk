import { Component } from "../../lib/Component";
const datas = require("../../../mockData.json");

class Chat extends Component {
  chat: any;
  router: any;
  constructor(parent, chat, router) {
    super(parent);
    this.chat = chat;
    this.router = router;
  }

  mount() {
    const chatRoom = document.querySelector(`.chatRoom${this.chat.id}`);
    chatRoom.addEventListener("click", () => {
      const data = datas.room.find((data) => String(data.id) === chatRoom.id);
      console.log(data);
      this.router.setData(data);
      this.router.push("/room");
    });
  }

  render() {
    return `
    <div class="chatRoom chatRoom${this.chat.id}" id="${this.chat.id}">
        <div class="imageContainer">
            ${this.chat.friends
              .map((friend) => `<img src="${friend.profileImg}" />`)
              .join("")}
        </div>
        <div class="roomContent">
            <span class="roomTitle">${this.chat.title}</span>
            <span class="chatContent">${this.chat.content}</span>
        </div>
        <div class="roomInfo">
            <span class="time">${this.chat.time}</span>
            ${
              this.chat.unread
                ? `<span class="unread">${this.chat.unread}</span>`
                : ``
            }
        </div>
    </div>
        `;
  }
}

export { Chat };
