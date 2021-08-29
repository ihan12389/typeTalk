import {Component} from "../../lib/Component";

class Search extends Component {
    constructor(parent) {
        super(parent);
    }

    render() {
        return `
        <div class="search">
            <input type="text" placeholder="🔍 Search Chatting and Friends" />
        </div>
        `;
    }
}

export{Search}