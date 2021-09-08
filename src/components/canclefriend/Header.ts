import { Component } from "../../lib/Component";

class Header extends Component {
  len: any;
  router: any;
  me: any;
  constructor(parent, len, me, router) {
    super(parent);
    this.len = len;
    this.me = me;
    this.router = router;
  }

  mount() {
    const home = document.querySelector(".home");
    const chat = document.querySelector(".chat");
    const news = document.querySelector(".news");
    const more = document.querySelector(".more");

    home.classList.add("focus");

    chat.addEventListener("click", () => {
      chat.setAttribute("disabled", "disabled");
      this.router.setData(this.me);
      this.router.push("/chat");
      home.classList.remove("focus");
    });
    news.addEventListener("click", () => {
      news.setAttribute("disabled", "disabled");
      this.router.push("/news");
      home.classList.remove("focus");
    });
    more.addEventListener("click", () => {
      more.setAttribute("disabled", "disabled");
      this.router.push("/more");
      home.classList.remove("focus");
    });
  }

  render() {
    return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>Friends ${this.len}</span>
                <div class="headerButtonContainer">
                    <button type="button"><img src="./public/images/add.png" /></button>
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
