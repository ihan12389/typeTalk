import {Component} from "../lib/Component";

class MainContainer extends Component {
    constructor() {
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

export{MainContainer};