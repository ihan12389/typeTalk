import { Component } from "../../lib/Component";
import { Profile } from "./Profile";

class Main extends Component {
  myprofile: any;
  router: any;
  constructor(parent, myprofile, router) {
    super(parent);
    this.myprofile = myprofile;
    this.router = router;
  }

  mount() {
    document
      .querySelector(`#${this.myprofile.uid}`)
      .addEventListener("click", () => {
        console.log("클릭");
        this.router.setData(this.myprofile);
        this.router.push("/profile");
      });
    this.components.map((component) => component.mount());
  }

  render() {
    return `
        <div class="main">
            <div class="myProfileText">
                <span>내 프로필</span>
            </div>
            <div class="myProfile" id="${this.myprofile.uid}">
                <div class="profileLeft">
                    <img src="${this.myprofile.profileImg==="" ? "./images/profile.jpg" : this.myprofile.profileImg}" />
                    <span>${this.myprofile.nickname}</span>
                </div>
                ${
                  this.myprofile.profileMessage
                    ? `<div class="profileMessage"><span>${this.myprofile.profileMessage}</span></div>`
                    : ""
                }
            </div>
            <div class="myProfileText">
                <span>친구</span>
            </div>
            ${this.components.map((component) => component.render()).join("")}
        </div>
        `;
  }
}

export { Main };
