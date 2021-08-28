import { Component } from "../../lib/Component";

class Header extends Component {
  len: any;
  router: any;
  constructor(parent, len, router) {
    console.log(len);
    super(parent);
    this.len = len;
    this.router = router;
  }

  mount() {
    const home = document.querySelector(".home");
    const chat = document.querySelector(".chat");
    const more = document.querySelector(".more");
    home.classList.add("focus");
    chat.addEventListener("click", () => {
      this.router.push("/chat");
      home.classList.remove("focus");
    });
    more.addEventListener("click", ()=> {
      this.router.push("/more");
      home.classList.remove("focus");
    })
  }

  render() {
    return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>Friends ${this.len}</span>
                <div class="headerButtonContainer">
                    <button type="button"><img src="./images/add.png" /></button>
                    <button type="button"><img src="./images/more_c.png" /></button>
                </div>
            </div>
            <div class="headerTab">
                <div class="tabButton home">
                    <img src="./images/people.png" />
                </div>
                <div class="tabButton chat">
                    <img src="./images/chatting.png" />
                </div>
                <div class="tabButton news">
                    <img src="./images/news.png" />
                </div>
                <div class="tabButton more">
                    <img src="./images/more_r.png" />
                </div>
            </div>
        </div>
        `;
  }
}

export { Header };
