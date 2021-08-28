import {Component} from "../lib/Component";

class MoreContainer extends Component {
    constructor(parent) {
        super(null);
    }

    render() {
        return `
        <div class="mainContainerWrapper">
            <div class="mainContainer">
                ${this.components.map(component => component.render()).join('')}
            </div>
        </div>
        `
    }
}

export{MoreContainer};