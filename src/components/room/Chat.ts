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
        <img src="${this.chat.profileImg}" />
            <div class="content">
                <span class="name">${this.chat.name}</span>
                <div class="speechBuble">
                    <span>${this.chat.chatting}</span>
                </div>
            </div>
        <span class="time">${this.chat.time}</span>
    </div>
    `;
  }
}

export { Chat };
