import { Component } from "../../lib/Component";
import { Router } from "../../lib/Router";
const datas = require("../../../mockData.json");

class Button extends Component {
  friend: any;
  router: any;
  constructor(parent, friend, router) {
    super(parent);
    this.friend = friend;
    this.router = router;
  }

  mount() {
    const rooms = datas.room;
    const me = datas.myprofile;
    document.querySelector(".doChat").addEventListener("click", ()=>{
      if (me.uid === this.friend.uid) {
        alert("자기 자신과는 대화를 할 수 없습니다...")
        return;
      }
      const room = rooms.find((room)=> room.uids.includes(this.friend.uid))
      this.router.setData(room);
      this.router.push("/room");
    })
  }

  render() {
    return `
    <div class="container">
        <div class="button">
            <div class="buttonElement doChat">
                <div class="imgWrapper">
                    <img src="./images/chatting2.png" />
                </div>
                <span>채팅 하기</span>
            </div>
            <div class="buttonElement">
                <div class="imgWrapper">
                    <img src="./images/write.png" />
                </div>
                <span>프로필 관리</span>
            </div>
        </div>
    </div>
    `;
  }
}

export { Button };
