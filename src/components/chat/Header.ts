import { Component } from "../../lib/Component";

class Header extends Component {
  router: any;
  constructor(parent, router) {
    super(parent);
    this.router = router;
  }

  mount() {
    const home = document.querySelector(".home");
    const chat = document.querySelector(".chat");
    const news = document.querySelector(".news");
    const more = document.querySelector(".more");

    chat.classList.add("focus");

    home.addEventListener("click", () => {
      home.setAttribute("disabled", "disabled");
      this.router.push("/");
      chat.classList.remove("focus");
    });
    news.addEventListener("click", () => {
      news.setAttribute("disabled", "disabled");
      this.router.push("/news");
      chat.classList.remove("focus");
    });
    more.addEventListener("click", () => {
      more.setAttribute("disabled", "disabled");
      this.router.push("/more");
      chat.classList.remove("focus");
    });
  }

  render() {
    return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>Chatting</span>
                <div class="headerButtonContainer">
                    <button type="button"><img src="./public/images/more_c.png" /></button>
                </div>
            </div>
            <div class="headerTab">
                <div class="tabButton home">
                    <img src="./public/images/people.png" />
                </div>
                <div class="tabButton chat">
                    <img src="./public/images/chatting.png" />
                </div>
                <div class="tabButton news">
                    <img src="./public/images/news.png" />
                </div>
                <div class="tabButton more">
                    <img src="./public/images/more_r.png" />
                </div>
            </div>
        </div>
        `;
  }
}

export { Header };
