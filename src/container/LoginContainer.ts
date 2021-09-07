import { Component } from "../lib/Component";

class LoginContainer extends Component {
  constructor() {
    super(null);
  }

  render() {
    return `
        <div class="loginContainerWrapper">
            <div class="loginContainer">
                ${this.components
                  .map((component) => component.render())
                  .join("")}
            </div>
        </div>
        `;
  }
}

export { LoginContainer };
