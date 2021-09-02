import { Component } from "../../lib/Component";
import { firestore } from "../../../Firebase";

class Input extends Component {
    room: any;
    date: Date;
    me: any;
    constructor(parent, room, me) {
        super(parent);
        this.room = room;
        this.me = me;
        this.date = new Date();
    }

    mount() {
        // find my information
        var myInform;
        firestore.collection("users").doc(this.me.uid).get().then(doc => myInform = doc.data())
        // find friends id
        var friendId;
        this.room.friends.map((friend) => {
            if (friend.uid !== this.me.uid) {
                friendId = friend.uid;
            } 
        })
        // focus Input
        const chatInput = document.getElementById("chatInput");
        chatInput.focus();
        // when send chat message
        document.querySelector(".chatForm").addEventListener("submit", (event)=>{
            event.preventDefault();
            // get the chat's text
            const chat = (<HTMLInputElement>chatInput).value;
            // if nothing typing
            if (chat == "") {
                alert("you need something typing...")
                return;
            }
            // send chatting to database
            firestore.collection("rooms").doc(this.room.id).collection("chats").doc(`${Date.now()}`).set({
                uid : myInform.uid,
                nickname : myInform.nickname,
                profileImg : myInform.profileImg,
                chatting : chat,
                year : this.date.getFullYear(),
                month : this.date.getMonth()+1,
                date : this.date.getDate(),
                hour : this.date.getHours(),
                minute : this.date.getMinutes(),
                sender : this.me.uid,
                receiver : friendId,
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