import { Component } from "../../lib/Component";
import { firestore } from "../../../Firebase";

class Button extends Component {
  friend: any;
  router: any;
  date: Date;
  me: any;
  constructor(parent, friend, me, router) {
    super(parent);
    this.friend = friend;
    this.router = router;
    this.me = me;
    this.date = new Date()
  }

  mount() {
    document.getElementById("dochat").addEventListener("click", (event) => {
      const el = document.getElementById("dochat");
      el.setAttribute("disabled", "disabled");
      if (this.me.uid === this.friend.uid) {
        alert("Can't chat with me...");
        return;
      }

      // 먼저 채팅방이 이미 있는지 확인
      firestore
      .collection("users")
      .doc(this.me.uid)
      .collection("rooms")
      .where("friend.uid", "==", this.friend.uid)
      .get()
      .then((querySnap) => {
        if (querySnap.docs.length == 0) {
          //채팅방이 없다면
          const roomId = this.createRoomId();
          const room = {
            id : roomId,
            uids : [this.me.uid, this.friend.uid],
            friends : [this.me, this.friend],
            chats:[],
            time : Date.now(),
            year : this.date.getFullYear(),
            month : this.date.getMonth()+1,
            date : this.date.getDate(),
            hour : this.date.getHours(),
            minute : this.date.getMinutes(),
          }

          firestore
          .collection("users")
          .doc(this.me.uid)
          .collection("rooms")
          .doc(roomId)
          .set({
            "id" : roomId,
            "unreadMessage" : 0,
            "friend" : this.friend,
            "time" : Date.now(),
            "recentMessage": "",
            "year": this.date.getFullYear(),
            "month": this.date.getMonth()+1,
            "date": this.date.getDate(),
            "hour": this.date.getHours(),
            "minute": this.date.getMinutes(),
          });
          firestore
          .collection("users")
          .doc(this.friend.uid)
          .collection("rooms")
          .doc(roomId)
          .set({
            "id" : roomId,
            "unreadMessage" : 0,
            "friend" : this.me,
            "time" : Date.now(),
            "recentMessage": "",
            "year": this.date.getFullYear(),
            "month": this.date.getMonth()+1,
            "date": this.date.getDate(),
            "hour": this.date.getHours(),
            "minute": this.date.getMinutes(),
          });

          firestore
          .collection("rooms")
          .doc(roomId)
          .set(room)
          .then(()=>{
            this.router.setData([room, this.me, this.friend])
            this.router.push("/room")
          });
        } else {
          // 채팅방이 있다면
          firestore
          .collection("rooms")
          .doc(querySnap.docs[0].data().id)
          .get()
          .then((doc) => {
            const room = doc.data()
            this.router.setData([room, this.me, this.friend])
            this.router.push("/room")
          })
        }
      })
    })
    // 업데이트 화면으로 이동
    document
    .querySelector(".update")
    .addEventListener("click", () => {
      this.router.setData(this.me);
      this.router.push("/update");
    })
  }

  // 랜덤한 Room의 id를 생성하는 함수
  createRoomId = () => {
    function s4() {
      return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  render() {
    return `
    <div class="container">
        <div class="button">
            <div class="buttonElement doChat">
                <div class="imgWrapper" id="dochat">
                    <img src="./public/images/chatting2.png" />
                </div>
                <span>DO CHAT</span>
            </div>
            ${this.me.uid === this.friend.uid ?`
            <div class="buttonElement update">
                <div class="imgWrapper" id="update">
                    <img src="./public/images/write.png" />
                </div>
                <span>UPDATE</span>
            </div>
            ` : "" }
        </div>
    </div>
    `;
  }
}

export { Button };
