import {Component} from "../../lib/Component";

class Chat extends Component {
    chats: any;
    constructor(parent, chats){
        super(parent)
        this.chats = chats;
    }

    render() {
        return `
        <div class="chat">
        ${this.chats.map(chat=>`
            <div class="chatRoom">
                <div class="imageContainer">
                    ${chat.friends.map(friend=>`<img src="${friend.profileImg}" />`).join('')}
                </div>
                <div class="roomContent">
                    <span class="roomTitle">${chat.title}</span>
                    <span class="chatContent">${chat.content}</span>
                </div>
                <div class="roomInfo">
                    <span class="time">${chat.time}</span>
                    ${chat.unread?`<span class="unread">${chat.unread}</span>`:``}
                </div>
            </div>
        `).join('')}
        </div>
        `;
    }
}

export{Chat};