import { Component } from "../../lib/Component";
import { auth, firestore } from "../../../Firebase";

class Chat extends Component {
  chat: any;
  router: any;
  friend: any;
  room: any;
  me: any;
  deleteChat: any;

  constructor(parent, room, friend, me, deleteChat, router) {
    super(parent);
    // 이 방의 룸 정보
    this.room = room;
    // 이 방의 상대방 정보
    this.friend = friend;
    // 내 정보
    this.me = me;
    console.log(room, friend, me);
    this.deleteChat = deleteChat;
    this.router = router;
  }

  mount() {
    document
      .getElementById(`delete${this.room.id}`)
      .addEventListener("click", () => {
        var ans = confirm("Do you really want to delete it?");
        if (ans) {
          firestore.collection("rooms").doc(this.room.id).delete();
          firestore
            .collection("users")
            .doc(this.me.uid)
            .collection("rooms")
            .doc(this.room.id)
            .delete();
          firestore
            .collection("users")
            .doc(this.friend.uid)
            .collection("rooms")
            .doc(this.room.id)
            .delete();
          this.deleteChat(this.room.id, this.friend.uid);
        }
      });
  }

  render() {
    return `
    <div class="chatRoom delete" id="delete${this.room.id}">
        <div class="imageContainer">
            <img src="${
              this.friend.profileImg
            }" onError="this.src='./public/images/profile.jpg';" alt="..." />
        </div>
        <div class="roomContent">
            <span class="roomTitle">${this.friend.nickname}</span>
            <span class="chatContent">${this.room.recentMessage}</span>
        </div>
        <div class="roomInfo">
            <span class="time">${
              parseInt(this.room.hour) < 10
                ? `0${this.room.hour}`
                : this.room.hour
            }
        :
        ${
          parseInt(this.room.minute) < 10
            ? `0${this.room.minute}`
            : this.room.minute
        }</span>
            ${
              this.room.unreadMessage
                ? `<span class="unread">${this.room.unreadMessage}</span>`
                : ``
            }
        </div>
    </div>
        `;
  }
}

export { Chat };
