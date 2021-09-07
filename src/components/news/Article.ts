import { Component } from "../../lib/Component";

class Article extends Component {
  url: any;
  img: any;
  title: any;
  from: any;
  constructor(parent, url, img, title, from) {
    super(parent);
    this.url = url;
    this.img = img;
    this.title = title;
    this.from = from;
  }

  render() {
    return `
    <div class="newsBox">
        <a href="${this.url}">
            <div class="newsWith">
                <img class="newsImg" src="
                ${this.img ? this.img : "./public/images/news.jpg"}
                " />
                <span class="newsTitle">${this.title}</span>
            </div>
            <h3 class="newsFrom">${this.from}</h3>
        </a>
    </div>
                        `;
  }
}

export { Article };
