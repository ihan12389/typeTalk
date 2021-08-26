import { Page } from "../lib/Page";
import { MainContainer } from "../container/MainContainer";
import { Main } from "../components/main/Main";
import { Header } from "../components/main/Header";
import { Search } from "../components/main/Search";
import { Profile } from "../components/main/Profile";

class MainPage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new MainContainer();
    new Header(container, datas[0].friends.length, router);
    new Search(container);
    const main = new Main(container, datas[0].myprofile, router);
    datas[0].friends.map((friend) => new Profile(main, friend, router));
  }
}

export { MainPage };
