import { Page } from "../lib/Page";
import { ChatContainer } from "../container/ChatContainer";
import { Chats } from "../components/chat/Chats";
import { Header } from "../components/chat/Header";
import { Search } from "../components/chat/Search";
import { Chat } from "../components/chat/Chat";

class ChatPage extends Page {
  constructor({ router, datas }) {
    super(router);
    const container = new ChatContainer(null);
    new Header(container, router);
    new Search(container);
    const chatContainer = new Chats(container, datas[0].chats, router);
    datas[0].chats.map((chat) => new Chat(chatContainer, chat, router));
  }
}

export { ChatPage };
