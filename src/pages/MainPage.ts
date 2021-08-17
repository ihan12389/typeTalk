import {Page} from "../lib/Page";
import {MainContainer} from "../container/MainContainer";
import {Main} from "../components/main/Main";
import {Header} from "../components/main/Header";
import {Search} from "../components/main/Search";
import {Profile} from "../components/main/Profile";

class MainPage extends Page {
    constructor(datas) {
        super();
        const container = new MainContainer();
        new Header(container, datas.friends.length);
        new Search(container);
        const main = new Main(container, datas.myprofile);
        datas.friends.map(friend => new Profile(main, friend))
    }
}

export{MainPage};