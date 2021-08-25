import { Router } from "./lib/Router";
import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/ChatPage";
import { RoomPage } from "./pages/RoomPage";
import { ProfilePage } from "./pages/ProfilePage";

const datas = require("../mockData.json");

const pages = [
  { page: MainPage, path: "/" },
  { page: ChatPage, path: "/chat" },
  { page: RoomPage, path: "/room" },
  { page: ProfilePage, path: "/profile" },
];

const router = new Router({ pages: pages });

router.setData(datas);
router.push(pages[3].path);
