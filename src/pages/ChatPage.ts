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
  roomList = [];
  chatList = [];

  constructor({ router, datas }) {
    super(router);

    const me = datas[0];

    const container = new ChatContainer(null);
    new Header(container, router);
    new Search(container);
    const chatContainer = new Chats(container, router);

    // 현재 유저가 가지고 있는 룸의 리스트를 불러오고 감시합니다.
    firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("rooms")
    .orderBy("time", "desc")
    .onSnapshot((snapshot) => {
      chatContainer.components = [];

      this.idList = [];
      this.friendList = [];
      this.chatList = [];
      this.roomList = [];

      this.fetchRoomsList(snapshot)
      .then(() => {
        // 혹시 불러온 룸의 리스트가 없다면 그냥 렌더링합니다.
        if (this.roomList.length == 0) {
          this.render();
          this.mount();
          return;
        }
        // 파이어스토어에서 룸 정보들을 검색해서 찾아옵니다.
        firestore
        .collection("rooms")
        .where("id", "in", this.idList)
        .orderBy("time", "desc")
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc=>{
            this.chatList.push(doc.data());
          })
        }).then(()=> {
          var idx=0;
          this.chatList.map(chat => {
            new Chat(chatContainer, chat, this.roomList[idx], this.friendList[idx], me, router);
            idx++;
          })
        }).then(()=> {
          this.render();
          this.mount();
        }).catch(err => console.log(err.message));
      })
    })
  }

  // 불러온 룸의 리스트를 배열에 순차적으로 저장합니다.
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
