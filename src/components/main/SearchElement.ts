import {Component} from "../../lib/Component";
import {firestore} from "../../../Firebase";

class SearchElement extends Component {
    user: any;
    me: any;
    constructor(parent, user, me) {
        super(parent);
        this.user = user;
        this.me = me;
    }

    mount() {
        // 친구 추가 버튼을 클릭
        document.getElementById(`search${this.user.uid}`).addEventListener("click", ()=> {
            // 먼저 내 uid를 구합니다
            // 내 자신을 친구추가할 수는 없습니다
            if (this.me.uid === this.user.uid) {
                alert("This is me....");
                return;
            }

            // // 내 doc에 접근
            firestore.collection("users").doc(this.me.uid)
            // // 내 doc의 firends 컬렉션에 접근
            .collection("friends")
            // // 내 friends를 추가
            .doc(this.user.uid)
            .set(this.user).catch(error => alert(error.message))
            .then(()=>{
                var currentFriends = this.me.friends;
                currentFriends.push(this.user.uid);
                console.log(currentFriends);

                firestore.collection("users").doc(this.me.uid).update({
                    friends : currentFriends
                })
            });
        })
    }

    render() {
        return `
        <div class="searchElement">
            <img src="${this.user.profileImg ? this.user.profileImg : "./public/images/profile.jpg"}" />
            <div class="searchText">
                <span class="nickname">${this.user.nickname}</span>
                <span class="email">${this.user.email}</span>
            </div>
            <button class="addFriend" id="search${this.user.uid}">친구 추가</button>
        </div>
        `;
    }
}

export{SearchElement}