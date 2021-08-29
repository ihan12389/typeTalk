import { Page } from "../lib/Page";
import { ChatContainer } from "../container/ChatContainer";
import { Chats } from "../components/chat/Chats";
import { Header } from "../components/chat/Header";
import { Search } from "../components/chat/Search";
import { Chat } from "../components/chat/Chat";

import {firestore, auth} from "../../Firebase";

class ChatPage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new ChatContainer(null);
    new Header(container, router);
    new Search(container);
    const chatContainer = new Chats(container, datas[0].chats, router);

    firestore.collection("users").doc(auth.currentUser.uid).collection("rooms").get().then((snapshot) => {
      snapshot.docs.map(doc => {
        var id = doc.data().id;
        var friend = doc.data().friend;

        firestore.collection("rooms").doc(id).get().then(doc => {
          if (doc.exists) {
            new Chat(chatContainer, doc.data(), friend, router)
            this.render();
            this.mount();
          }
        })
      })
    })
  }

}

export { ChatPage };
