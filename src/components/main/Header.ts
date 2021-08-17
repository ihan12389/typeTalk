class Header {
    friendNum: any;
    constructor(friendNum){
        this.friendNum = friendNum;
    }

    render() {
        return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>친구 ${this.friendNum}</span>
                <div class="headerButtonContainer">
                    <button type="button"><img src="./images/add.png" /></button>
                    <button type="button"><img src="./images/more_c.png" /></button>
                </div>
            </div>
            <div class="headerTab">
                <div class="tabButton">
                    <img src="./images/people.png" />
                </div>
                <div class="tabButton">
                    <img src="./images/chatting.png" />
                </div>
                <div class="tabButton">
                    <img src="./images/news.png" />
                </div>
                <div class="tabButton">
                    <img src="./images/more_r.png" />
                </div>
            </div>
        </div>
        `;
    }
}

export{Header};