import {Component} from "../../lib/Component";

class Search extends Component {
    constructor(parent) {
        super(parent);
    }

    render() {
        return `
        <div class="search">
            <input type="text" placeholder="🔍 이름(초성), 전화번호 검색" />
        </div>
        `;
    }
}

export{Search}