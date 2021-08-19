import { Component } from "../../lib/Component";
const datas = require("../../../mockData.json");

class Chats extends Component {
  chats: any;
  router: any;
  constructor(parent, chats, router) {
    super(parent);
    this.chats = chats;
    this.router = router;
  }

  mount() {
    this.components.map((component) => component.mount());
  }

  render() {
    return `
        <div class="chat">
        ${this.components.map((component) => component.render()).join("")}
        </div>
        `;
  }
}

export { Chats };
