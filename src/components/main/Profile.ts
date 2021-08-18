import {Component} from "../../lib/Component";

class Profile extends Component {
    friend: any;
    constructor(parent, friend) {
        super(parent);
        this.friend = friend;
    }

    render() {
        return `
        <div class="profile">
            <div class="profileLeft">
                <img src="${this.friend.profileImg}" />
                <span>${this.friend.nickname}</span>
            </div>
            ${this.friend.profileMessage ? `<div class="profileMessage"><span>${this.friend.profileMessage}</span></div>` : ""}
        </div>
        `;
    }
}

export{Profile}