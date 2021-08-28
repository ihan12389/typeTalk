import {Component} from "../../lib/Component";
import {firestore, auth} from "../../../Firebase";

class SearchElement extends Component {
    user: any;
    constructor(parent, user) {
        super(parent);
        this.user = user;
    }

    mount() {
        // 친구 추가 버튼을 클릭
        document.getElementById(`${this.user.uid}`).addEventListener("click", ()=> {
            // 먼저 내 uid를 구합니다
            const myUid = auth.currentUser.uid;
            console.log(myUid);
            console.log(this.user);
            // 내 자신을 친구추가할 수는 없습니다
            if (myUid === this.user.uid) {
                alert("This is me....");
                return;
            }
            // // 내 doc에 접근
            firestore.collection("users").doc(myUid)
            // // 내 doc의 firends 컬렉션에 접근
            .collection("firends")
            // // 내 friends를 추가
            .doc(this.user.uid)
            .set(this.user).catch(error => alert(error.message));
        })
    }

    render() {
        return `
        <div class="searchElement">
            <img src="${this.user.profileImg ? this.user.profileImg : "./images/profile.jpg"}" />
            <div class="searchText">
                <span class="nickname">${this.user.nickname}</span>
                <span class="email">${this.user.email}</span>
            </div>
            <button class="addFriend" id="${this.user.uid}">친구 추가</button>
        </div>
        `;
    }
}

export{SearchElement}