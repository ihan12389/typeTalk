import { Component } from "../lib/Component";

class Loading extends Component {
  constructor(parent) {
    super(parent);
  }

  render() {
    return `
      <div class="loadingContainer">
        <img src="./public/images/loading.gif" alt="loading" />
      </div>
      `;
  }
}

export { Loading };
