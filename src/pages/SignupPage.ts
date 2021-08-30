import { Page } from "../lib/Page";
import {SignupContainer} from "../container/SignupContainer";
import {Signup} from "../components/auth/Signup";

class SignupPage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new SignupContainer();
    new Signup(container, router);
    this.render();
    this.mount();
  }
}

export { SignupPage };
