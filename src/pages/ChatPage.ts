import { Page } from "../lib/Page";
import { ChatContainer } from "../container/ChatContainer";
import { Chats } from "../components/chat/Chats";
import { Header } from "../components/chat/Header";
import { Search } from "../components/chat/Search";
import { Chat } from "../components/chat/Chat";

import {firestore, auth} from "../../Firebase";

class ChatPage extends Page {
  idList = [];
  friendList = [];
  docList = []
  chatList = []
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
        this.idList.push(id);
        this.friendList.push(friend);
      })
    })
    .then(() => {
      firestore.collection("rooms").where("id", "in", this.idList).get().then(snapshot => {
        snapshot.docs.map(doc=>{
          this.chatList.push(doc.data());
        })
      }).then(()=> {
        var idx=0;
        this.chatList.map(chat => {
          new Chat(chatContainer, chat, this.friendList[idx], router);
          idx++;
        })
      }).then(()=> {
        this.render();
        this.mount();
      }).catch(err => console.log(err.message));
    })
  }
}

export { ChatPage };
