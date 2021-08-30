import { Page } from "../lib/Page";
import {LoginContainer} from "../container/LoginContainer";
import {Login} from "../components/auth/Login";

class LoginPage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new LoginContainer();
    new Login(container, router);
    this.render();
    this.mount();
  }
}

export { LoginPage };
