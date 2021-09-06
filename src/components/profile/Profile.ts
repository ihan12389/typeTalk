import { Component } from "../../lib/Component";

class Profile extends Component {
  user: any;
  constructor(parent, user) {
    super(parent);
    this.user = user;
  }

  render() {
    return `
    <div class="profile">
        <img src="
        ${
          this.user.profileImg 
          ? this.user.profileImg 
          : "./public/images/profile.jpg"
        }
        " class="thumbnail" />
        <span class="name">
          ${this.user.nickname}
        </span>
        <div class="email">
          <span>
            ${this.user.email}
          </span>
        </div>
        <span class="message">
        ${
          this.user.profileMessage !== "" 
          ? this.user.profileMessage 
          : ""
        }
        </span>
    </div>
    `;
  }
}

export { Profile };
