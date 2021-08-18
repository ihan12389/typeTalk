import {Component} from "../lib/Component";

class ChatContainer extends Component {
    constructor(parent) {
        super(parent);
    }

    render() {
        return `
        <div class="chatContainerWrapper">
            <div class="chatContainer">
                ${this.components.map(component => component.render()).join('')}
            </div>
        </div>
        `
    }
}

export{ChatContainer};