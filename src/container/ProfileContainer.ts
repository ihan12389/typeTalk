import { Component } from "../lib/Component";
const datas = require("../../mockData.json");
const friends = datas.friends[0];

class ProfileContainer extends Component {
  datas: any;
  constructor(parnet) {
    super(null);
    this.datas = datas;
  }

  render() {
    return `
        <div class="profileContainerWrapper">
            <div class="profileContainer">
                <div class="backgroundImg">
                    <img src="${friends.background}" />
                </div>
                <div class="container">
                    <div class="profile">
                        <img src="${friends.profileImg}" class="thumbnail" />
                        <span class="name">${friends.nickname}</span>
                        <div class="email"><span>${friends.email}</span></div>
                    </div>
                    <div class="button">
                        <div class="buttonElement">
                            <div class="imgWrapper">
                                <img src="./images/chatting2.png" />
                            </div>
                            <span>나와의 채팅</span>
                        </div>
                        <div class="buttonElement">
                            <div class="imgWrapper">
                                <img src="./images/write.png" />
                            </div>
                            <span>프로필 관리</span>
                        </div>
                    </div>
                </div>
                <span class="close">X</span>
            </div>
        </div>
    `;
  }
}

export { ProfileContainer };
