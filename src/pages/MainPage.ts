import { Page } from "../lib/Page";
import { MainContainer } from "../container/MainContainer";
import { Main } from "../components/main/Main";
import { Header } from "../components/main/Header";
import { Search } from "../components/main/Search";
import { Profile } from "../components/main/Profile";
import {firestore, auth} from "../../Firebase";

class MainPage extends Page {
  constructor({ router, datas }) {
    var len=0;
    super(router);
    var me;
    var container;
    var header;
    var search;
    var main;

    
    firestore.collection("users").doc(auth.currentUser.uid).get().then((doc)=>{
      me = doc.data();
      container = new MainContainer();
      header = new Header(container, len, router);
      
      search = new Search(container, me);
      main = new Main(container, me, router);
    }).then(()=>{
      firestore.collection("users").doc(auth.currentUser.uid).collection("friends").orderBy("nickname", "asc").onSnapshot((snapshot) => {
        main.components=[];
        header.len = snapshot.docs.length;
        search.components = [];
        
        snapshot.docs.map(snap => {
          new Profile(main, snap.data(), router);
        })
        
        this.render();
        this.mount();
      })
    })
    
    
    /* 쿼리문 테스트 용도 */
    firestore.collection("users").where("friends", "array-contains-any", [auth.currentUser.uid])
    .get().then((snap)=>{
      console.log(snap.docs.length);
    })
  }
}

export { MainPage };
