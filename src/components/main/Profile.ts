class Profile {
    friend: any;
    constructor(friend) {
        this.friend = friend;
    }

    render() {
        return `
        <div class="myProfile">
            <img src="${this.friend.profileImg}" />
            <span>${this.friend.nickname}</span>
        </div>
        `;
    }
}

export{Profile}