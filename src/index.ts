import {MainPage} from "./pages/MainPage";
const datas = require("../mockData.json");

const mainPage = new MainPage(datas);
mainPage.render();