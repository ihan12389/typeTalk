const datas = require("../../mockData.json");

import {Main} from "../components/main/Main";
import {Header} from "../components/main/Header";
import {Search} from "../components/main/Search";

class MainContainer {
    app = document.getElementById("app");
    constructor() {
    }

    render() {
        this.app.innerHTML = `
        <div class="mainContainerWrapper">
            <div class="mainContainer">
                ${new Header(datas.friends.length).render()}
                ${new Search().render()}
                ${new Main(datas).render()}
            </div>
        </div>
        `
    }
}

export{MainContainer};