import { Page } from "../lib/Page";
import { MainContainer } from "../container/MainContainer";
import { Main } from "../components/main/Main";
import { Header } from "../components/main/Header";
import { Search } from "../components/main/Search";
import { Profile } from "../components/main/Profile";
import { mockData } from "../../mockData";
import {firestore, auth} from "../../Firebase";

class MainPage extends Page {
  constructor({ router, datas }) {
    var len=0;
    mockData.init();
    super(router);
    const container = new MainContainer();
    const header = new Header(container, len, router);
    new Search(container);
    const main = new Main(container, mockData.me, router);
    // reRendering when user add new Friend
    firestore.collection("users").doc(auth.currentUser.uid).collection("firends").orderBy("nickname", "asc").onSnapshot((snapshot) => {
          main.components=[];
          header.len = snapshot.docs.length;
          snapshot.docs.map(snap => {
            new Profile(main, snap.data(), router);
          })
          this.render();
          this.mount();
      })
  }
}

export { MainPage };
