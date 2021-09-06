import { Component } from "../../lib/Component";
import {auth, firestore} from "../../../Firebase";

class Signup extends Component {
    app = document.getElementById("app");
    router: any;
    constructor(parent, router) {
        super(parent);
        this.router = router;
    }

    mount() {
        /* Try Sign up */
        document
        .getElementById("signupSubmit")
        .onclick = function() {
            const nickname = (<HTMLInputElement>document.getElementById("nickname")).value;
            const email = (<HTMLInputElement>document.getElementById("email")).value;
            const password = (<HTMLInputElement>document.getElementById("password")).value;

            auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const userInform = {
                    nickname : nickname,
                    email : email,
                    profileImg : "",
                    profileMessage : "",
                    background : "",
                    uid : user.user.uid,
                    friends:[]
                }
                firestore
                .collection("users")
                .doc(user.user.uid)
                .set(userInform)
                .catch(error => error); 
            })
            .catch(error => alert(error.message));
        }
        /* Move Login Page */
        document
        .getElementById("moveLogin")
        .addEventListener("click", ()=>{
            this.router.push("/login")
        })
    }

    render() {
        return `
        <div class="loginLogoContainer">
            <img class="loginLogo" src="./public/images/logo.png" alt="" />
        </div>
        <div class="loginFormContainer">
            <div class="loginInputContainer">
                <input type="passowrd" id="nickname" placeholder="닉네임" />
                <input type="email" id="email" placeholder="카카오계정 (이메일)" />
                <input type="password" id="password" placeholder="비밀번호" />
            </div>
            <button class="loginButton" id="signupSubmit">회원가입</button>
            <button type="submit" class="moveButton" id="moveLogin">로그인</button>
        </div>
        `
    }
}

export {Signup};