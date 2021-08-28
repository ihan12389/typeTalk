import { Component } from "../../lib/Component";

class Profile extends Component {
  friend: any;
  constructor(parent, friend) {
    super(parent);
    this.friend = friend;
  }

  render() {
    return `
    <div class="profile">
        <img src="${this.friend.profileImg ? this.friend.profileImg : "./images/profile.jpg"}" class="thumbnail" />
        <span class="name">${this.friend.nickname}</span>
        <div class="email"><span>${this.friend.email}</span></div>
    </div>
    `;
  }
}

export { Profile };
