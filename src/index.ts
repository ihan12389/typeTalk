import {Router} from "./lib/Router";
import {MainPage} from "./pages/MainPage";
import {ChatPage} from "./pages/ChatPage";
const datas = require("../mockData.json");

const pages = [
    {page:MainPage, path:"/"},
    {page:ChatPage, path:"/chat"}
];

const router = new Router({pages:pages});

router.setData(datas);
router.push(pages[0].path);