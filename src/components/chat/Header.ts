import {Component} from "../../lib/Component";

class Header extends Component {
    constructor(parent){
        super(parent)
    }

    render() {
        return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>채팅</span>
                <div class="headerButtonContainer">
                    <button type="button"><img src="./images/more_c.png" /></button>
                </div>
            </div>
            <div class="headerTab">
                <div class="tabButton">
                    <img src="./images/people.png" />
                </div>
                <div class="tabButton">
                    <img src="./images/chatting.png" />
                </div>
                <div class="tabButton">
                    <img src="./images/news.png" />
                </div>
                <div class="tabButton">
                    <img src="./images/more_r.png" />
                </div>
            </div>
        </div>
        `;
    }
}

export{Header};