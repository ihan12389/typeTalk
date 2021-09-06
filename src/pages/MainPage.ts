import { Page } from "../lib/Page";
import { MainContainer } from "../container/MainContainer";
import { Main } from "../components/main/Main";
import { Header } from "../components/main/Header";
import { Search } from "../components/main/Search";
import { Profile } from "../components/main/Profile";
import {firestore, auth} from "../../Firebase";

// 메인 페이지
class MainPage extends Page {
  constructor({ router, datas }) {
    var len=0;
    super(router);
    var me;
    var container;
    var header;
    var search;
    var main;
    // 현재 내 정보를 가져옵니다.
    firestore.collection("users").doc(auth.currentUser.uid).get().then((doc)=>{
      me = doc.data();

      container = new MainContainer();
      header = new Header(container, len, me, router);
      
      search = new Search(container, me);
      main = new Main(container, me, router);
    }).then(()=>{
      // 내가 가지고 있는 내 친구들의 정보를 가져오고 감시합니다.
      firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("friends")
      .orderBy("nickname", "asc")
      .onSnapshot((snapshot) => {
        main.components=[];
        search.components = [];
        // 친구들의 수
        header.len = snapshot.docs.length;
        
        snapshot.docs.map(snap => {
          new Profile(main, snap.data(), me, router);
        })
        
        this.render();
        this.mount();
      })
    }) 
  }
}

export { MainPage };