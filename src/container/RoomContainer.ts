import { Component } from "../lib/Component";
const datas = require("../../mockData.json");

class RoomContainer extends Component {
  datas: any;
  constructor(parnet) {
    super(null);
    this.datas = datas;
  }

  render() {
    return `
        <div class="roomContainerWrapper">
            <div class="roomContainer">
                <div class="headerBar">
                    <div class="headerLeft">
                        <img class="back" src="./images/back.png" />
                        <span class="roomName">${datas.room.title}</span>
                        <span class="friendsNum">${
                          datas.room.friends.length
                        }</span>
                    </div>
                    <div class="headerRight">
                        <img class="search" src="./images/search.png" />
                        <img class="menu" src="./images/menu.png" />
                    </div>
                </div>
                <div class="roomContent">
                ${datas.room.chats
                  .map(
                    (chat) =>
                      `
                <div class="chat">
                    <img src="${chat.profileImg}" />
                        <div class="content">
                            <span class="name">${chat.name}</span>
                            <div class="speechBuble">
                                <span>${chat.chatting}</span>
                            </div>
                        </div>
                        <span class="time">${chat.time}</span>
                </div>`
                  )
                  .join("")}
                </div>
            </div>
        </div>
        `;
  }
}

export { RoomContainer };
