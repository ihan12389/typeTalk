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
        // 친구 추가 버튼 클릭
        document.getElementById(`search${this.user.uid}`).addEventListener("click", ()=> {
            // 나 자신을 친추할 수는 없습니다.
            if (this.me.uid === this.user.uid) {
                alert("This is me....");
                return;
            }
            // 나의 friends 컬렉션 안에 친구의 정보를 추가합니다.
            firestore
            .collection("users")
            .doc(this.me.uid)
            .collection("friends")
            .doc(this.user.uid)
            .set(this.user)
            .catch(error => alert(error.message))
            .then(()=>{
                // 내가 가진 친구 리스트도 수정
                var currentFriends = this.me.friends;
                currentFriends.push(this.user.uid);

                firestore
                .collection("users")
                .doc(this.me.uid)
                .update({
                    friends : currentFriends
                })
            });
        })
    }

    render() {
        return `
        <div class="searchElement">
            <img src="${
                this.user.profileImg 
                ? this.user.profileImg 
                : "./public/images/profile.jpg"
            }" />
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