import { Component } from "../../lib/Component";

class Profile extends Component {
  friends: any;
  constructor(parent, friends) {
    super(parent);
    this.friends = friends;
  }

  render() {
    return `
    <div class="profile">
        <img src="${this.friends.profileImg}" class="thumbnail" />
        <span class="name">${this.friends.nickname}</span>
        <div class="email"><span>${this.friends.email}</span></div>
    </div>
    `;
  }
}

export { Profile };
