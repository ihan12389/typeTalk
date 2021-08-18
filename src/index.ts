import {MainPage} from "./pages/MainPage";
import {ChatPage} from "./pages/ChatPage";
const datas = require("../mockData.json");

// const mainPage = new MainPage(datas);
// mainPage.render();
const chatPage = new ChatPage(datas);
chatPage.render();