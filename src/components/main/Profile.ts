import {Component} from "../../lib/Component";

class Profile extends Component {
    friend: any;
    constructor(parent, friend) {
        super(parent);
        this.friend = friend;
    }

    render() {
        return `
        <div class="myProfile">
            <img src="${this.friend.profileImg}" />
            <span>${this.friend.nickname}</span>
        </div>
        `;
    }
}

export{Profile}