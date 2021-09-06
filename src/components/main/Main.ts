import { Component } from "../../lib/Component";

class Main extends Component {
  myprofile: any;
  router: any;
  constructor(parent, myprofile, router) {
    super(parent);
    this.myprofile = myprofile;
    this.router = router;
  }

  mount() {
    // 프로필 화면 이동
    document
      .getElementById(`${this.myprofile.uid}`)
      .addEventListener("click", () => {
        this.router.setData([this.myprofile, this.myprofile]);
        this.router.push("/profile");
      });
    // 하위 컴포넌트들도 마운팅
    this.components.map((component) => component.mount());
  }

  render() {
    return `
        <div class="main">
            <div class="myProfileText">
                <span>My Profile</span>
            </div>
            <div class="myProfile" id="${this.myprofile.uid}">
                <div class="profileLeft">
                    <img src="${this.myprofile.profileImg==="" ? "./public/images/profile.jpg" : this.myprofile.profileImg}" />
                    <span>${this.myprofile.nickname}</span>
                </div>
                ${
                  this.myprofile.profileMessage
                    ? `<div class="profileMessage"><span>${this.myprofile.profileMessage}</span></div>`
                    : ""
                }
            </div>
            <div class="myProfileText">
                <span>My Friends</span>
            </div>
            ${this.components.map((component) => component.render()).join("")}
        </div>
        `;
  }
}

export { Main };
