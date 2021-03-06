import { Page } from "../lib/Page";
import {MoreContainer} from "../container/MoreContainer";
import {Header} from "../components/more/Header";
import {LogoutButton} from "../components/more/LogoutButton";

class MorePage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new MoreContainer(null);
    new Header(container, router);
    new LogoutButton(container);
    this.render();
    this.mount();
  }
}

export { MorePage };