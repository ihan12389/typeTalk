import { Component } from "../../lib/Component";

class Articles extends Component {
  articles: any;
  constructor(parent, articles) {
    super(parent);
    this.articles = articles;
  }

  render() {
    return `
      <div class="space"> </div>
        <div class="articles">
            <span class="newsLabel">채널 소식</span>
            <div class="newsGrid">
            ${this.components.map((component) => component.render()).join("")}
        </div>
    </div>
      `;
  }
}

export { Articles };
