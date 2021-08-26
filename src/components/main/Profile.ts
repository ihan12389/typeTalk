import { Component } from "../../lib/Component";

class Profile extends Component {
  friend: any;
  router: any;
  constructor(parent, friend, router) {
    super(parent);
    this.friend = friend;
    this.router = router;
  }

  mount() {
    document
      .querySelector(`#${this.friend.uid}`)
      .addEventListener("click", () => {
        console.log("클릭");
        this.router.setData(this.friend);
        this.router.push("/profile");
      });
  }

  render() {
    return `
        <div class="profile" id="${this.friend.uid}"">
            <div class="profileLeft">
                <img src="${this.friend.profileImg}" />
                <span>${this.friend.nickname}</span>
            </div>
            ${
              this.friend.profileMessage
                ? `<div class="profileMessage"><span>${this.friend.profileMessage}</span></div>`
                : ""
            }
        </div>
        `;
  }
}

export { Profile };
