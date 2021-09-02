import { Page } from "../lib/Page";
import { RoomContainer } from "../container/RoomContainer";
import { Header } from "../components/room/Header";
import { Content } from "../components/room/Content";
import { Chat } from "../components/room/Chat";
import {Input} from "../components/room/Input";
import {firestore, auth} from "../../Firebase";
import { timeStamp } from "console";


class RoomPage extends Page {
  me: any;
  constructor({ router, datas }) {
    super(router);

    this.me = auth.currentUser;

    const container = new RoomContainer(null);
    new Header(container, datas[0], this.me, router);
    const content = new Content(container, datas[0].chats);
    
    new Input(container, datas[0], this.me);

    firestore.collection("rooms").doc(datas[0].id).collection("chats").onSnapshot(snapshot => {
      content.components = [];
      
      snapshot.docs.map(doc => {
        new Chat(content, doc.data(), this.me);
      })
      
      this.render();
      this.mount();
    })
  }
}

export { RoomPage };
