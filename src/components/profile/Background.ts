import { Component } from "../../lib/Component";

class Background extends Component {
  user: any;
  router: any;
  me: any;
  constructor(parent, user, me, router) {
    super(parent);
    this.user = user;
    this.me = me;
    this.router = router;
  }

  mount() {
    document.querySelector(".closeProfile").addEventListener("click", () => {
      this.router.setData(this.me);
      this.router.push("/");
    });
  }

  render() {
    return `
    <div class="backgroundImg">
            <img class="newsImg" src="${this.user.background}" onError="this.src='./public/images/background.jpg';" alt="..." />
            <span class="closeProfile">X</span>
    </div>
    `;
  }
}

export { Background };
