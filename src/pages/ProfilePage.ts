import { Page } from "../lib/Page";
import { ProfileContainer } from "../container/ProfileContainer";
import { Background } from "../components/profile/Background";
import { Container } from "../components/profile/Container";
import { Button } from "../components/profile/Button";
import { Profile } from "../components/profile/Profile";

class ProfilePage extends Page {
  constructor({ router, datas }) {
    super(router);
    
    const user = datas[0][0];
    const me = datas[0][1];

    const profileContainer = new ProfileContainer(null);
    new Background(profileContainer, user, me, router);
    const container = new Container(profileContainer);
    new Profile(container, user);
    new Button(container, user, me, router);

    this.render();
    this.mount();
  }
}

export { ProfilePage };