class Main {
    constructor(){}

    render() {
        return `
        <div class="headerContainer">
            <div class="headerBar">
                <span>친구 94</span>
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
        <div class="search">
            <input type="text" placeholder="🔍 이름(초성), 전화번호 검색" />
        </div>
        <div class="main">
            <div class="myProfileText">
                <span>내 프로필</span>
            </div>
            <div class="myProfile">
                <img src="./images/profile.jpg" />
                <span>이한</span>
            </div>
            <div class="myProfileText">
                <span>친구</span>
            </div>
            <div class="profile">
                <img src="./images/profile.jpg" />
                <span>권혁진</span>
            </div>
            <div class="profile">
                <img src="./images/profile.jpg" />
                <span>송태균</span>
            </div>
            <div class="profile">
                <img src="./images/profile.jpg" />
                <span>김주현</span>
            </div>
        </div>
        `;
    }
}

export{Main};