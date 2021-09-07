import { Component } from "../lib/Component";
const datas = require("../../mockData.json");
const friends = datas.friends[0];

class ProfileContainer extends Component {
  datas: any;
  constructor(parnet) {
    super(null);
    this.datas = datas;
  }

  render() {
    return `
        <div class="profileContainerWrapper">
            <div class="profileContainer">
              ${this.components.map((component) => component.render()).join("")}
            </div>
        </div>
    `;
  }
}

export { ProfileContainer };
