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
    const more = document.querySelector(".more");
    more.classList.add("focus");
    home.addEventListener("click", () => {
      home.setAttribute("disabled", "disabled");
      this.router.push("/");
      more.classList.remove("focus");
    });
    chat.addEventListener("click", ()=> {
      chat.setAttribute("disabled", "disabled");
      this.router.push("/chat");
      more.classList.remove("focus");
    })
  }

  render() {
    return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>LOGOUT</span>
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
