import { Page } from "../lib/Page";
import { MainContainer } from "../container/MainContainer";
import { Main } from "../components/main/Main";
import { Header } from "../components/main/Header";
import { Search } from "../components/main/Search";
import { Profile } from "../components/main/Profile";
import { mockData } from "../../mockData";

class MainPage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new MainContainer();
    new Header(container, mockData.friends.length, router);
    new Search(container);
    const main = new Main(container, mockData.me, router);
    mockData.friends.map((friend) => new Profile(main, friend, router));
  }
}

export { MainPage };
