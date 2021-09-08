import { Page } from "../lib/Page";
import { CancleFriendContainer } from "../container/CancleFriendContainer";
import { Header } from "../components/canclefriend/Header";
import { Main } from "../components/canclefriend/Main";
import { Profile } from "../components/canclefriend/Profile";

class CancleFriendPage extends Page {
  friends: any;
  container: CancleFriendContainer;
  me: any;
  constructor({ router, datas }) {
    super(router);
    this.friends = datas[0][0];
    this.me = datas[0][1];
    this.router = router;
    this.container = new CancleFriendContainer(null, datas);
    new Header(this.container, this.friends.length, this.me, router);
    const main = new Main(this.container);

    this.friends.map((friend) => {
      new Profile(
        main,
        friend,
        this.friends,
        this.me,
        router,
        this.updateFriends
      );
    });

    this.render();
    this.mount();
  }

  updateFriends = (friends) => {
    this.friends = friends;
    this.container.components = [];
    new Header(this.container, this.friends.length, this.me, this.router);
    const main = new Main(this.container);

    this.friends.map((friend) => {
      new Profile(
        main,
        friend,
        this.friends,
        this.me,
        this.router,
        this.updateFriends
      );
    });
  };
}

export { CancleFriendPage };
