class MockData {
    constructor(){}

    me = undefined;
    friends = [];

    updateMe = (user) => {
        this.me = user;
    }

    updateFriends = (friends) => {
        this.friends = friends;
    }

    addFriends = (friend) => {
        this.friends.push(friend);
    }
}

const mockData = new MockData();

export{MockData, mockData}