import { Component } from "../../lib/Component";

class Header extends Component {
  friendNum: any;
  router: any;
  constructor(parent, friendNum, router) {
    super(parent);
    this.friendNum = friendNum;
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
                <span>친구 ${this.friendNum}</span>
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
