import { Page } from "../lib/Page";
import { Background } from "../components/update/Background";
import { Button } from "../components/update/Button";
import { Container } from "../components/update/Container";
import { Profile } from "../components/update/Profile";
import { ProfileUpdateContainer } from "../container/ProfileUpdateContainer";
import {auth, firestore} from "../../Firebase";

class ProfileUpdatePage extends Page {
  constructor({ router, datas }) {
    super(router);
    const profileContainer = new ProfileUpdateContainer(null);
    firestore.collection("users").doc(auth.currentUser.uid).onSnapshot((doc) => {
      profileContainer.components = [];
      const me = doc.data();
      new Background(profileContainer, me, router);
      const container = new Container(profileContainer);
      new Profile(container, me);
      new Button(container, me, me, router);
      this.render();
      this.mount();
    })
  }
}

export { ProfileUpdatePage };