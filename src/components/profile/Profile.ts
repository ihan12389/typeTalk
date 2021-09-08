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
        <img class="thumbnail" src="${
          this.user.profileImg
        }" onError="this.src='./public/images/profile.jpg';" alt="..." />
        <span class="name">
          ${this.user.nickname}
        </span>
        <div class="email">
          <span>
            ${this.user.email}
          </span>
        </div>
        <span class="message">
        ${this.user.profileMessage !== "" ? this.user.profileMessage : ""}
        </span>
    </div>
    `;
  }
}

export { Profile };
