import {Profile} from "./profile";

class Main {
    datas: any;
    constructor(datas){
        this.datas = datas;
    }

    render() {
        return `
        <div class="main">
            <div class="myProfileText">
                <span>내 프로필</span>
            </div>
            <div class="myProfile">
                <img src="${this.datas.myprofile.profileImg}" />
                <span>${this.datas.myprofile.nickname}</span>
            </div>
            <div class="myProfileText">
                <span>친구</span>
            </div>
            ${this.datas.friends.map(friend => new Profile(friend).render()).join()}
        </div>
        `;
    }
}

export{Main};