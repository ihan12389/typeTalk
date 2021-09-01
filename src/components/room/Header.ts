import { Component } from "../../lib/Component";
const datas = require("../../../mockData.json");

class Header extends Component {
  room: any;
  router: any;
  me: any;
  constructor(parent, room, me, router) {
    super(parent);
    this.room = room;
    this.router = router;
    this.me = me;
  }

  mount() {
    const back = document.querySelector(".back");
    back.addEventListener("click", () => {
      this.router.setData(datas);
      this.router.push("/chat");
    });
  }

  getRoomTitle() {
    const friendUid = this.room.uids.filter(uid => uid !== this.me.uid)[0];
    const friend = this.room.friends.filter(friend => friend.uid === friendUid)[0];
    return friend.nickname;
  }

  render() {
    return `
        <div class="headerBar">
            <div class="headerLeft">
                <img class="back" src="./public/images/back.png" />
                <span class="roomName">${this.getRoomTitle()}</span>
                <span class="friendsNum">${this.room.friends.length}</span>
            </div>
            <div class="headerRight">
                <img class="search" src="./public/images/search.png" />
                <img class="menu" src="./public/images/menu.png" />
            </div>
        </div>
        `;
  }
}

export { Header };
