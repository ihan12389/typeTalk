import { Component } from "../../lib/Component";
const datas = require("../../../mockData.json");

class Background extends Component {
  friends: any;
  router: any;
  constructor(parent, friends, router) {
    super(parent);
    this.friends = friends;
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
            <img src="${this.friends.background}" />
            <span class="closeProfile">X</span>
    </div>
    `;
  }
}

export { Background };
