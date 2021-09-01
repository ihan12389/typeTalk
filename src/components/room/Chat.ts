import { Component } from "../../lib/Component";

class Chat extends Component {
  chat: any;
  me: any;
  state : string;
  constructor(parent, chat, me) {
    super(parent);
    this.chat = chat;
    this.me = me;
  }

  setState(s) {
    this.state = s;
  }

  render() {
    return `
    ${this.chat.uid === this.me.uid ? 
    `
    <div class="myChat ${this.state}">
      <span class="time">${parseInt(this.chat.hour) < 10 ? `0${this.chat.hour}` : this.chat.hour}:${parseInt(this.chat.minute) < 10 ? `0${this.chat.minute}` : this.chat.minute}</span>
      <div class="content">
        <span class="name">${this.chat.nickname}</span>
        <div class="speechBuble">
          <span>${this.chat.chatting}</span>
        </div>
      </div>
      <img src="${this.chat.profileImg ? this.chat.profileImg : "./public/images/profile.jpg"}" />
    </div>
    ` : `
    <div class="chat ${this.state}">
        <img src="${this.chat.profileImg ? this.chat.profileImg : "./public/images/profile.jpg"}" />
            <div class="content">
                <span class="name">${this.chat.nickname}</span>
                <div class="speechBuble">
                    <span>${this.chat.chatting}</span>
                </div>
            </div>
        <span class="time">${parseInt(this.chat.hour) < 10 ? `0${this.chat.hour}` : this.chat.hour}:${parseInt(this.chat.minute) < 10 ? `0${this.chat.minute}` : this.chat.minute}</span>
    </div>
    `}
    `;
  }
}

export { Chat };
