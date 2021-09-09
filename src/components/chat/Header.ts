import { Component } from "../../lib/Component";

class Header extends Component {
  router: any;
  friendList: any;
  roomList: any;
  me: any;
  constructor(parent, me, roomList, friendList, router) {
    super(parent);
    this.router = router;
    this.me = me;
    this.roomList = roomList;
    this.friendList = friendList;
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

    document.getElementById("chatDropButton").addEventListener("click", () => {
      const drop = document.getElementById("chatDropdown");
      console.log(drop);
      if (drop.style.display == "none") {
        drop.style.display = "inline-block";
      } else {
        drop.style.display = "none";
      }
    });

    document.getElementById("chatDropLi").addEventListener("click", () => {
      this.router.setData([this.me, this.roomList, this.friendList]);
      this.router.push("/canclechat");
    });
  }

  render() {
    return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>Chatting</span>
                <div class="headerButtonContainer">
                    <div class="dropbox">
                      <button type="button" id="chatDropButton"><img src="./public/images/more_c.png" /></button>
                      <div style="display:none;" class="chatDropdown" id="chatDropdown">
                        <span id="chatDropLi">Delete Chatting</span>
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
