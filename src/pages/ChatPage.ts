import { Page } from "../lib/Page";
import { ChatContainer } from "../container/ChatContainer";
import { Chats } from "../components/chat/Chats";
import { Header } from "../components/chat/Header";
import { Search } from "../components/chat/Search";
import { Chat } from "../components/chat/Chat";

import {firestore, auth} from "../../Firebase";
import { AsyncLocalStorage } from "async_hooks";

class ChatPage extends Page {
  idList = [];
  friendList = [];
  roomList = [];
  chatList = []
  constructor({ router, datas }) {
    super(router);
    const container = new ChatContainer(null);
    new Header(container, router);
    new Search(container);
    const chatContainer = new Chats(container, datas[0].chats, router);

    // 현재 유저가 가지고 있는 룸의 리스트를 구합니다.
    firestore.collection("users").doc(auth.currentUser.uid).collection("rooms").orderBy("time", "desc").onSnapshot((snapshot) => {
      chatContainer.components = [];
      this.idList = [];
      this.friendList = [];
      this.chatList = [];
      this.roomList = [];

      this.fetchRoomsList(snapshot)
      .then(() => {
        if (this.roomList.length == 0) {
          this.render();
          this.mount();
          return;
        }
        // 그 룸의 리스트를 통해 룸의 정보들을 불러옵니다.
        firestore.collection("rooms").where("id", "in", this.idList).orderBy("time", "desc").get().then(snapshot => {
          snapshot.docs.map(doc=>{
            this.chatList.push(doc.data());
          })
        }).then(()=> {
          var idx=0;
          this.chatList.map(chat => {
            new Chat(chatContainer, chat, this.roomList[idx], this.friendList[idx], router);
            idx++;
          })
        }).then(()=> {
          this.render();
          this.mount();
        }).catch(err => console.log(err.message));
      })
    })
  }

  fetchRoomsList = async (snapshot) => {
    snapshot.docs.map(doc => {
        
        var id = doc.data().id;
        var friend = doc.data().friend;
        
        this.roomList.push(doc.data());
        this.idList.push(id);
        this.friendList.push(friend);
      })
  }
}

export { ChatPage };
