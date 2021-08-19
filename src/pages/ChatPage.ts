import { Page } from "../lib/Page";
import { ChatContainer } from "../container/ChatContainer";
import { Chat } from "../components/chat/Chat";
import { Header } from "../components/chat/Header";
import { Search } from "../components/chat/Search";

class ChatPage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new ChatContainer(null);
    new Header(container, router);
    new Search(container);
    new Chat(container, datas[0].chats);
  }
}

export { ChatPage };
