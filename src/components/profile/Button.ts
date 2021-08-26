import { Component } from "../../lib/Component";

class Button extends Component {
  constructor(parent) {
    super(parent);
  }

  render() {
    return `
    <div class="container">
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
    `;
  }
}

export { Button };
