import { Component } from "../../lib/Component";

class Content extends Component {
  chats: any;
  constructor(parent, chats) {
    super(parent);
    this.chats = chats;
  }

  render() {
    return `
    <div class="roomContent">
        ${this.components.map((component) => component.render()).join("")}
    </div>
        `;
  }
}

export { Content };
