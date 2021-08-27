import { Router } from "./lib/Router";
import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/ChatPage";
import { RoomPage } from "./pages/RoomPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { auth } from "../Firebase";
import { SignupPage } from "./pages/SignupPage";

const datas = require("../mockData.json");

// 로그인 상태 확인
auth.onAuthStateChanged(user => {
  // 로그인 상태
  if (user) {
    console.log("로그인 중")
    const pages = [
      { page: MainPage, path: "/" },
      { page: ChatPage, path: "/chat" },
      { page: RoomPage, path: "/room" },
      { page: ProfilePage, path: "/profile" },
    ];
    const router = new Router({pages: pages})

    router.setData(datas);
    router.push(pages[1].path);
  }
  // 로그아웃 상태
  else {
    console.log("로그아웃 중")
    const pages = [
      { page : LoginPage, path : "/login"}
      ,{page : SignupPage, path : "/signup"}
    ]
    const router = new Router({pages: pages})

    router.setData(datas);
    router.push(pages[1].path);
  }
});
