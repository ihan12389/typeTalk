import { Page } from "../lib/Page";
import { ProfileContainer } from "../container/ProfileContainer";
import { Background } from "../components/profile/Background";
import { Container } from "../components/profile/Container";
import { Button } from "../components/profile/Button";
import { Profile } from "../components/profile/Profile";

class ProfilePage extends Page {
  constructor({ router, datas }) {
    super(router);
    const profileContainer = new ProfileContainer(null);
    new Background(profileContainer, datas[0], router);
    const container = new Container(profileContainer);
    new Profile(container, datas[0]);
    new Button(container, datas[0], router);
    this.render();
    this.mount();
  }
}

export { ProfilePage };