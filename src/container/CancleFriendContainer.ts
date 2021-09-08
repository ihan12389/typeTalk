import { Component } from "../lib/Component";

class CancleFriendContainer extends Component {
  friends: any;
  constructor(parent, friends) {
    super(parent);
    this.friends = friends;
  }

  render() {
    return `
        <div class="mainContainerWrapper">
            <div class="mainContainer">
                ${this.components
                  .map((component) => component.render())
                  .join("")}
            </div>
        </div>
        `;
  }
}

export { CancleFriendContainer };
