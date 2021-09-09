import { Page } from "../lib/Page";
import { ChatContainer } from "../container/ChatContainer";
import { Chats } from "../components/cancleChat/Chats";
import { Header } from "../components/cancleChat/Header";
import { Chat } from "../components/cancleChat/Chat";

class CancleChatPage extends Page {
  friendList = [];
  roomList = [];
  me: any;

  constructor({ router, datas }) {
    super(router);
    console.log(datas);

    // 필요 정보 전부 받아오기
    this.me = datas[0][0];
    this.roomList = datas[0][1];
    this.friendList = datas[0][2];

    const container = new ChatContainer(null);
    new Header(container, this.me, router);
    const chatContainer = new Chats(container, router);

    var idx = 0;
    console.log(this.roomList);
    this.roomList.map((room) => {
      new Chat(
        chatContainer,
        room,
        this.friendList[idx],
        this.me,
        this.deleteChat,
        router
      );
      idx++;
    });

    this.render();
    this.mount();
  }

  deleteChat = (roomId, friendId) => {
    console.log("reset 전");
    this.reset();
    console.log("reset 후");

    this.roomList = this.roomList.filter((room) => room.id !== roomId);
    this.friendList = this.friendList.filter(
      (friend) => friend.uid !== friendId
    );

    const container = new ChatContainer(null);
    new Header(container, this.me, this.router);
    const chatContainer = new Chats(container, this.router);

    var idx = 0;
    console.log(this.roomList);
    this.roomList.map((room) => {
      new Chat(
        chatContainer,
        room,
        this.friendList[idx],
        this.me,
        this.deleteChat,
        this.router
      );
      idx++;
    });

    this.render();
    this.mount();
  };
}

export { CancleChatPage };
