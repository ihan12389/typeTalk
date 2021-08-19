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
    chat.classList.add("focus");
    home.addEventListener("click", () => {
      this.router.push("/");
      chat.classList.remove("focus");
    });
  }

  render() {
    return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>채팅</span>
                <div class="headerButtonContainer">
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
