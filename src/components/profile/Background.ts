import { Component } from "../../lib/Component";
const datas = require("../../../mockData.json");

class Background extends Component {
  friend: any;
  router: any;
  constructor(parent, friend, router) {
    super(parent);
    this.friend = friend;
    this.router = router;
  }

  mount() {
    document.querySelector(".closeProfile").addEventListener("click", () => {
      this.router.setData(datas);
      this.router.push("/");
    });
  }

  render() {
    return `
    <div class="backgroundImg">
            <img src="${this.friend.background ? this.friend.background : "./images/background.jpg"}" />
            <span class="closeProfile">X</span>
    </div>
    `;
  }
}

export { Background };
