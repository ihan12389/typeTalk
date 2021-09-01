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
    // Match users and chatting room
    document.getElementById("dochat").addEventListener("click", (event) => {
      // prevent double click event
      const el = document.getElementById("dochat");
      el.setAttribute("disabled", "disabled");
      // can't chat with me
      if (this.me.uid === this.friend.uid) {
        alert("Can't chat with me...");
        return;
      }

      // search room with this friend
      firestore.collection("users").doc(this.me.uid).collection("rooms").doc(this.friend.uid).get().then(doc => {
        if (doc.exists) {
          // already make chatting room with this friend
          firestore.collection("rooms").doc(doc.data().id).get().then(doc=>{
            const room = doc.data();
            this.router.setData(room);
            this.router.push("/room");
          })
        } else {
          // didn't make chatting room with this friend not yet
          const roomId = this.createRoomId();
          const room = {
            id : roomId,
            uids : [this.me.uid, this.friend.uid],
            friends : [this.me, this.friend],
            chats:[],
            time : Date(),
            year : this.date.getFullYear(),
            month : this.date.getMonth()+1,
            date : this.date.getDate(),
            hour : this.date.getHours(),
            minute : this.date.getMinutes(),
            recentMessage : "",
          }
          firestore.collection("users").doc(this.me.uid).collection("rooms").doc(this.friend.uid).set({
            "id" : roomId,
            "unreadMessage" : 0,
            "friend" : this.friend
          });
          firestore.collection("users").doc(this.friend.uid).collection("rooms").doc(this.me.uid).set({
            "id" : roomId,
            "unreadMessage" : 0,
            "friend" : this.me
          });
          firestore.collection("rooms").doc(roomId).set(room);
          this.router.setData(room);
          this.router.push("/room");
        }
      })
    })
    document.querySelector(".update").addEventListener("click", () => {
      this.router.setData(this.me);
      this.router.push("/update");
    })
  }

  // make Room's uid
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
