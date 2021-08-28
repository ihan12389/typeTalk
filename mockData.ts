import {auth, firestore} from "./Firebase";

class MockData {
    me = undefined;
    friends = [];

    constructor() {
    }


    updateMe = (user) => {
        this.me = user;
    }

    updateFriends = (friends) => {
        this.friends = friends;
    }

    addFriends = (friend) => {
        this.friends.push(friend);
    }

    init = async() => {
        firestore.collection("users").doc(auth.currentUser.uid).collection("firends").onSnapshot((snapshot) => {
            snapshot.docs.map(snap => {
                this.friends.push(snap.data());
            })
        })
    }
}

const mockData = new MockData();

export{MockData, mockData}