import e from "express";
import { Component } from "../../lib/Component";

class Header extends Component {
  len: any;
  router: any;
  me: any;
  friends: any;
  constructor(parent, len, me, friends, router) {
    super(parent);
    this.len = len;
    this.me = me;
    this.router = router;
    this.friends = friends;
  }

  mount() {
    this.router.setData(this.me);

    const home = document.querySelector(".home");
    const chat = document.querySelector(".chat");
    const news = document.querySelector(".news");
    const more = document.querySelector(".more");

    home.classList.add("focus");

    chat.addEventListener("click", () => {
      chat.setAttribute("disabled", "disabled");
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

    document.getElementById("mainDropButton").addEventListener("click", () => {
      const drop = document.getElementById("mainDropdown");
      console.log(drop);
      if (drop.style.display == "none") {
        drop.style.display = "inline-block";
      } else {
        drop.style.display = "none";
      }
    });

    document.getElementById("dropLi").addEventListener("click", () => {
      this.router.setData([this.friends, this.me]);
      this.router.push("/canclefriend");
    });
  }

  render() {
    return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>Friends ${this.len}</span>
                <div class="headerButtonContainer">
                    <div class="dropbox">
                      <button type="button" id="mainDropButton"><img src="./public/images/more_c.png" /></button>
                      <div style="display:none;" class="dropdown" id="mainDropdown">
                        <span id="dropLi">Delete Friends</span>
                      </div>
                    </div>
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
