import { Component } from "../../lib/Component";

class Chat extends Component {
  chat: any;
  constructor(parent, chat) {
    super(parent);
    this.chat = chat;
  }

  render() {
    return `
    <div class="chat">
        <img src="${this.chat.profileImg ? this.chat.profileImg : "./images/profile.jpg"}" />
            <div class="content">
                <span class="name">${this.chat.nickname}</span>
                <div class="speechBuble">
                    <span>${this.chat.chatting}</span>
                </div>
            </div>
        <span class="time">${this.chat.hour}:${this.chat.minute}</span>
    </div>
    `;
  }
}

export { Chat };
