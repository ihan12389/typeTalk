import { Component } from "../../lib/Component";

class Container extends Component {
  constructor(parent) {
    super(parent);
  }

  render() {
    return `
    <div class="container">
        ${this.components.map((component) => component.render()).join("")}
    </div>
    `;
  }
}

export { Container };
