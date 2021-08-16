import {Main} from "../Main";

class MainContainer {
    app = document.getElementById("app");
    constructor() {
    }

    render() {
        this.app.innerHTML = `
        <div class="mainContainerWrapper">
            <div class="mainContainer">
                ${new Main().render()}
            </div>
        </div>
        `
    }
}

export{MainContainer};