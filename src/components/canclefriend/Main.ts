import { Component } from "../../lib/Component";

class Main extends Component {
  myprofile: any;
  router: any;
  constructor(parent) {
    super(parent);
  }

  render() {
    return `
        <div class="main">
            <div class="myProfileText">
                <span>My Friends</span>
            </div>
            ${this.components.map((component) => component.render()).join("")}
        </div>
        `;
  }
}

export { Main };
