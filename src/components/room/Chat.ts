import { Component } from "../../lib/Component";

class Chat extends Component {
  chat: any;
  me: any;
  state: string;
  friend: any;
  constructor(parent, chat, me, friend) {
    super(parent);
    this.chat = chat;
    this.me = me;
    this.friend = friend;
  }

  setState(s) {
    this.state = s;
  }

  render() {
    return `
    ${
      this.chat.uid === this.me.uid
        ? `
    <div class="myChat ${this.state}">
      <span class="time">
      ${parseInt(this.chat.hour) < 10 ? `0${this.chat.hour}` : this.chat.hour}
        :
        ${
          parseInt(this.chat.minute) < 10
            ? `0${this.chat.minute}`
            : this.chat.minute
        }
        </span>
      <div class="content">
        <span class="name">
          ${this.me.nickname}
        </span>
        <div class="speechBuble">
          <span>
            ${this.chat.chatting}
          </span>
        </div>
      </div>
      <img src="${
        this.me.profileImg
      }" onError="this.src='./public/images/profile.jpg';" alt="..." />
    </div>
    `
        : `
    <div class="chat ${this.state}">
        <img src="${
          this.friend.profileImg
        }" onError="this.src='./public/images/profile.jpg';" alt="..." />
            <div class="content">
                <span class="name">
                  ${this.friend.nickname}
                </span>
                <div class="speechBuble">
                    <span>
                      ${this.chat.chatting}
                    </span>
                </div>
            </div>
        <span class="time">
        ${parseInt(this.chat.hour) < 10 ? `0${this.chat.hour}` : this.chat.hour}
        :
        ${
          parseInt(this.chat.minute) < 10
            ? `0${this.chat.minute}`
            : this.chat.minute
        }
        </span>
    </div>
    `
    }
    `;
  }
}

export { Chat };
