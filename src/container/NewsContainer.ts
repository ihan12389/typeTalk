import { Component } from "../lib/Component";

class NewsContainer extends Component {
  articles: any;
  constructor(parent) {
    super(parent);
  }

  render() {
    return `
        <div class="newsContainerWrapper">
            <div class="newsContainer">
                ${this.components
                  .map((component) => component.render())
                  .join("")}
            </div>
        </div>
        `;
  }
}

export { NewsContainer };
