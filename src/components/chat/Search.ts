import {Component} from "../../lib/Component";

class Search extends Component {
    constructor(parent) {
        super(parent);
    }

    render() {
        return `
        <div class="search">
            <input type="text" placeholder="🔍 채팅방 이름, 참여자 검색" />
        </div>
        `;
    }
}

export{Search}