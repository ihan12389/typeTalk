import { Component } from "../lib/Component";

class NewsContainer extends Component {
  articles: any;
  constructor(parent, articles) {
    super(parent);
    this.articles = articles;
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
