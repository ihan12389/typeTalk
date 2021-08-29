import {Input} from "../components/room/Input";
import { Component } from "../lib/Component";

const datas = require("../../mockData.json");

class RoomContainer extends Component {
  datas: any;
  constructor(parnet) {
    super(null);
    this.datas = datas;
  }

  render() {
    return `
        <div class="roomContainerWrapper">
            <div class="roomContainer">
                ${this.components
                  .map((component) => component.render())
                  .join("")}
            </div>
        </div>
        `;
  }
}

export { RoomContainer };
