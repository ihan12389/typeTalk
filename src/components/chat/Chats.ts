import { Component } from "../../lib/Component";
const datas = require("../../../mockData.json");

class Chats extends Component {
  router: any;
  constructor(parent, router) {
    super(parent);
    this.router = router;
  }

  mount() {
    this.components.map((component) => component.mount());
  }

  render() {
    return `
        <div class="chat">
          ${this.components.map(component => component.render()).join("")}
        </div>
    `;
  }
}

export { Chats };
