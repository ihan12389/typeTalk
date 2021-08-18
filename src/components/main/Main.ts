import {Component} from "../../lib/Component";

class Main extends Component {
    myprofile: any;
    constructor(parent, myprofile){
        super(parent);
        this.myprofile = myprofile;
    }

    render() {
        return `
        <div class="main">
            <div class="myProfileText">
                <span>내 프로필</span>
            </div>
            <div class="myProfile">
                <div class="profileLeft">
                    <img src="${this.myprofile.profileImg}" />
                    <span>${this.myprofile.nickname}</span>
                </div>
                ${this.myprofile.profileMessage ? `<div class="profileMessage"><span>${this.myprofile.profileMessage}</span></div>` : ""}
            </div>
            <div class="myProfileText">
                <span>친구</span>
            </div>
            ${this.components.map(component => component.render()).join('')}
        </div>
        `;
    }
}

export{Main};