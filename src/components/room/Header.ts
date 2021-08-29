import { Component } from "../../lib/Component";
import {auth} from "../../../Firebase";
const datas = require("../../../mockData.json");

class Header extends Component {
  room: any;
  router: any;
  constructor(parent, room, router) {
    super(parent);
    this.room = room;
    this.router = router;
  }

  mount() {
    const back = document.querySelector(".back");
    back.addEventListener("click", () => {
      this.router.setData(datas);
      this.router.push("/chat");
    });
  }

  getRoomTitle() {
    const friendUid = this.room.uids.filter(uid => uid !== auth.currentUser.uid)[0];
    const friend = this.room.friends.filter(friend => friend.uid === friendUid)[0];
    return friend.nickname;
  }

  render() {
    return `
        <div class="headerBar">
            <div class="headerLeft">
                <img class="back" src="./images/back.png" />
                <span class="roomName">${this.getRoomTitle()}</span>
                <span class="friendsNum">${this.room.friends.length}</span>
            </div>
            <div class="headerRight">
                <img class="search" src="./images/search.png" />
                <img class="menu" src="./images/menu.png" />
            </div>
        </div>
        `;
  }
}

export { Header };
