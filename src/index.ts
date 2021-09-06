import { Router } from "./lib/Router";
import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/ChatPage";
import { RoomPage } from "./pages/RoomPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { auth } from "../Firebase";
import { SignupPage } from "./pages/SignupPage";
import { firestore } from "../Firebase";
import { MorePage } from "./pages/MorePage";
import { ProfileUpdatePage } from "./pages/ProfileUpdatePage";

/* Check Login */
 auth.onAuthStateChanged(async(user) => {
  /* login */
  if (user) {
    console.log("로그인 중")
    await firestore.collection("users").doc(user.uid).get().then(data => {
      if (data.exists) {
        const pages = [
          { page: MainPage, path: "/" },
          { page: ChatPage, path: "/chat" },
          { page: RoomPage, path: "/room" },
          { page: ProfilePage, path: "/profile" },
          { page: MorePage, path: "/more"},
          { page: ProfileUpdatePage, path: "/update"}
        ];
        const router = new Router({pages: pages})
        router.push(pages[0].path);
      }
    })
  }
  /* logout */
  else {
    console.log("로그아웃 중")
    const pages = [
      { page : LoginPage, path : "/login"}
      ,{page : SignupPage, path : "/signup"}
    ]
    const router = new Router({pages: pages})
    router.push(pages[0].path);
  }
});
