import { Page } from "../lib/Page";
import { RoomContainer } from "../container/RoomContainer";

class RoomPage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new RoomContainer(null);
  }
}

export { RoomPage };
