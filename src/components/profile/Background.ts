import { Component } from "../../lib/Component";

class Background extends Component {
  friends: any;
  constructor(parent, friends) {
    super(parent);
    this.friends = friends;
  }

  render() {
    return `
    <div class="backgroundImg">
            <img src="${this.friends.background}" />
            <span class="close">X</span>
    </div>
    `;
  }
}

export { Background };
