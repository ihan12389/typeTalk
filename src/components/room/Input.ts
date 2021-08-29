import { Component } from "../../lib/Component";
import { auth, firestore } from "../../../Firebase";

class Input extends Component {
    room: any;
    date: Date;
    constructor(parent, room) {
        super(parent);
        this.room = room;
        this.date = new Date();
    }

    mount() {
        // find my information
        var me;
        firestore.collection("users").doc(auth.currentUser.uid).get().then(doc => me = doc.data())
        // when send chat message
        document.querySelector(".chatForm").addEventListener("submit", (event)=>{
            console.log(event);
            // get the chat's text
            const chat = (<HTMLInputElement>document.querySelector(".chatInput")).value
            if (chat == "") return;
            firestore.collection("rooms").doc(this.room.id).collection("chats").doc(`${Date.now()}`).set({
                uid : me.uid,
                nickname : me.nickname,
                profileImg : me.profileImg,
                chatting : chat,
                year : this.date.getFullYear(),
                month : this.date.getMonth()+1,
                date : this.date.getDate(),
                hour : this.date.getDate(),
                minute : this.date.getMinutes()
            }).then(() => {
                (<HTMLInputElement>document.querySelector(".chatInput")).value = "";
            })
        })
    }

    render() {
        return `
        <div class="chatInputWrap">
            <form class="chatForm">
                <input class="chatInput" placeholder="채팅을 입력해주세요" value="" />
                <button type="submit" class="chatButton">전송</button>
            </form>
        </div>
        `
    }
}

export{Input}