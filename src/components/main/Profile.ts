import { Component } from "../../lib/Component";

class Profile extends Component {
  friend: any;
  router: any;
  me: any;
  constructor(parent, friend, me, router) {
    super(parent);
    this.friend = friend;
    this.me = me;
    this.router = router;
  }

  mount() {
    // 프로필 화면으로 이동
    document
      .getElementById(`${this.friend.uid}`)
      .addEventListener("click", () => {
        this.router.setData([this.friend, this.me]);
        this.router.push("/profile");
      });
  }

  render() {
    return `
        <div class="profile" id="${this.friend.uid}"">
            <div class="profileLeft">
                <img src="${
                  this.friend.profileImg
                }" onError="this.src='./public/images/profile.jpg';" alt="..." />
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
