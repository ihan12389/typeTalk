import { Component } from "../../lib/Component";
import { firestore } from "../../../Firebase";

class Input extends Component {
    room: any;
    date: Date;
    me: any;
    friend: any;
    constructor(parent, room, me, frined) {
        super(parent);
        this.room = room;
        this.me = me;
        this.friend = frined;
        this.date = new Date();
    }

    mount() {
        // 입력창에 자동 포거스를 줍니다.
        const chatInput = document.getElementById("chatInput");
        chatInput.focus();
        // 채팅을 입력했을 때
        document
        .querySelector(".chatForm")
        .addEventListener("submit", (event)=>{
            // 새로고침 방지
            event.preventDefault();
            const chat = (<HTMLInputElement>chatInput).value;
            // 입력한 게 없을 경우엔
            if (chat == "") {
                alert("you need something typing...")
                return;
            }
            // 채팅을 하면 이 방의 time 정보를 최신으로 업데이트
            firestore
            .collection("rooms")
            .doc(this.room.id)
            .update({time:Date.now()})
            // 채팅 내용 파이어스토어에 저장
            firestore
            .collection("rooms")
            .doc(this.room.id)
            .collection("chats")
            .doc(`${Date.now()}`)
            .set({
                uid : this.me.uid,
                nickname : this.me.nickname,
                profileImg : this.me.profileImg,
                chatting : chat,
                year : this.date.getFullYear(),
                month : this.date.getMonth()+1,
                date : this.date.getDate(),
                hour : this.date.getHours(),
                minute : this.date.getMinutes(),
                sender : this.me.uid,
                receiver : this.friend.uid,
                id : Date.now()
            }).then(() => {
                (<HTMLInputElement>chatInput).value = "";
                chatInput.focus();
            })
        })
    }

    render() {
        return `
        <div class="chatInputWrap">
            <form class="chatForm">
                <input class="chatInput" id="chatInput" placeholder="채팅을 입력해주세요" value="" />
                <button type="submit" class="chatButton">전송</button>
            </form>
        </div>
        `
    }
}

export{Input}