import { Page } from "../lib/Page";
import { RoomContainer } from "../container/RoomContainer";
import { Header } from "../components/room/Header";
import { Content } from "../components/room/Content";
import { Chat } from "../components/room/Chat";

class RoomPage extends Page {
  constructor({ router, datas }) {
    console.log(datas[0]);
    super(router);
    const container = new RoomContainer(null);
    new Header(container, datas[0], router);
    const content = new Content(container, datas[0].chats);
    datas[0].chats.map((chat) => new Chat(content, chat));
  }
}

export { RoomPage };
