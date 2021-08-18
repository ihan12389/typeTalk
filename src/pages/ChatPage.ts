import {Page} from "../lib/Page";
import {ChatContainer} from "../container/ChatContainer";
import {Chat} from "../components/chat/Chat";
import { Header } from "../components/chat/Header";
import { Search } from "../components/chat/Search";
const datas = require("../../mockData.json");

class ChatPage extends Page {
    constructor(datas) {
        super();
        const container = new ChatContainer(null);
        new Header(container);
        new Search(container);
        new Chat(container, datas.chats);
    }
}

export{ChatPage};