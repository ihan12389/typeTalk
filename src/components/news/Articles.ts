import { Component } from "../../lib/Component";

class Articles extends Component {
  articles: any;
  title: String;
  constructor(parent, title) {
    super(parent);
    this.title = title;
  }

  render() {
    return `
        <div class="articles">
            <h4 class="newsLabel">${this.title} 채널 소식</h4>
            <div class="newsGrid">
            ${this.components.map((component) => component.render()).join("")}
        </div>
    </div>
      `;
  }
}

export { Articles };
