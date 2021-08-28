import {Component} from "../../lib/Component";

class SearchElement extends Component {
    user: any;
    constructor(parent, user) {
        super(parent);
        this.user = user;
    }

    render() {
        return `
        <div class="searchElement">
            <img src="${this.user.profileImg ? this.user.profileImg : "./images/profile.jpg"}" />
            <div class="searchText">
                <span class="nickname">${this.user.nickname}</span>
                <span class="email">${this.user.email}</span>
            </div>
            <button>친구 추가</button>
        </div>
        `;
    }
}

export{SearchElement}