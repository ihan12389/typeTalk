import { Page } from "../lib/Page";
import { ProfileContainer } from "../container/ProfileContainer";

class ProfilePage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new ProfileContainer(null);
  }
}

export { ProfilePage };
