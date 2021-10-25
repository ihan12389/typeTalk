import { Page } from "../lib/Page";
import { RoomContainer } from "../container/RoomContainer";
import { Header } from "../components/room/Header";
import { Content } from "../components/room/Content";
import { Chat } from "../components/room/Chat";
import { Input } from "../components/room/Input";
import { firestore, auth } from "../../Firebase";

class RoomPage extends Page {
  constructor({ router, datas }) {
    super(router);
    var chat = datas[0][0];
    var me = datas[0][1];
    var friend = datas[0][2];

    const container = new RoomContainer(null);
    new Header(container, chat, me, router);
    const content = new Content(container, chat.chats);
    new Input(container, chat, me, friend);

    // 채팅 데이터베이스에 접근해서 채팅 내용을 모니터&렌더링
    firestore
      .collection("rooms")
      .doc(chat.id)
      .collection("chats")
      .onSnapshot((snapshot) => {
        // 채팅이 추가됐을 때 안읽은 메세지를 0으로 설정
        // 서버의 작동을 기다리기 위해서 2초 시간 지연을 줍니다.
        setTimeout(function () {
          console.log("Room Here");
          firestore
            .collection("users")
            .doc(me.uid)
            .collection("rooms")
            .doc(chat.id)
            .update({ unreadMessage: 0 })
            .catch((err) => console.log(err.message));
        }, 2000);
        content.components = [];

        snapshot.docs.map((doc) => {
          new Chat(content, doc.data(), me, friend);
        });

        this.render();
        this.mount();
      });
  }
}

export { RoomPage };
