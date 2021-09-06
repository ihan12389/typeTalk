import { Page } from "../lib/Page";
import { Background } from "../components/update/Background";
import { Container } from "../components/update/Container";
import { Profile } from "../components/update/Profile";
import { ProfileUpdateContainer } from "../container/ProfileUpdateContainer";
import { auth, firestore } from "../../Firebase";

class ProfileUpdatePage extends Page {
  constructor({ router, datas }) {
    super(router);
    const profileContainer = new ProfileUpdateContainer(null);
    // 현재 내 프로필을 불러오고 감시합니다
    firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .onSnapshot((doc) => {
      profileContainer.components = [];
      const me = doc.data();
      new Background(profileContainer, me, router);
      const container = new Container(profileContainer);
      new Profile(container, me);
      this.render();
      this.mount();
    })
  }
}

export { ProfileUpdatePage };