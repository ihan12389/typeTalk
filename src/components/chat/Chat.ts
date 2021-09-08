import { Component } from "../../lib/Component";
import { auth, firestore } from "../../../Firebase";

class Chat extends Component {
  chat: any;
  router: any;
  friend: any;
  room: any;
  me: any;

  constructor(parent, chat, room, friend, me, router) {
    super(parent);
    // 이 방의 채팅 정보
    this.chat = chat;
    // 이 방의 룸 정보
    this.room = room;
    // 이 방의 상대방 정보
    this.friend = friend;
    // 내 정보
    this.me = me;
    this.router = router;
  }

  mount() {
    // 룸을 클릭하면 채팅 화면으로 넘어갑니다.
    document.getElementById(`${this.chat.id}`).addEventListener("click", () => {
      // 채팅 화면으로 넘어가면서 읽지 않은 메세지 수를 0으로 초기화합니다.
      if (this.room.unreadMessage !== "0") {
        firestore
          .collection("users")
          .doc(auth.currentUser.uid)
          .collection("rooms")
          .doc(this.room.id)
          .update({ unreadMessage: 0 })
          .catch((err) => console.log(err.message));
      }

      this.router.setData([this.chat, this.me, this.friend]);
      this.router.push("/room");
    });
  }

  render() {
    return `
    <div class="chatRoom" id="${this.room.id}">
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
            <span class="time">${this.room.hour}:${this.room.minute}</span>
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
