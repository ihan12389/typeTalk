import { Component } from "../../lib/Component";
import { auth } from "../../../Firebase";


class Login extends Component {
    app = document.getElementById("app");
    router: any;
    
    constructor(parent, router) {
        super(parent);
        this.router = router;
    }

    mount() {
        /* Try Login */
        document
        .getElementById("loginSubmit")
        .onclick = function() {
            var email = (<HTMLInputElement>document.getElementById('email')).value;
            var password = (<HTMLInputElement>document.getElementById('password')).value;
            auth.signInWithEmailAndPassword(email, password).then((user) => console.log("success")).catch(error => alert(error.message));
        }
        /* Move Sign up Page */
        document
        .getElementById("moveSignup")
        .addEventListener("click", ()=>{
            this.router.push("/signup");
        })
    }
    
    render() {
        return `
        <div class="loginLogoContainer">
            <img class="loginLogo" src="./public/images/logo.png" alt="" />
        </div>
        <div class="loginFormContainer">
                <div class="loginInputContainer">
                    <input type="text" id="email" placeholder="카카오계정 (이메일)" value=""/>
                    <input type="password" id="password" placeholder="비밀번호" value="" />
                </div>
                <button type="submit" class="loginButton" id="loginSubmit">로그인</button>
                <button type="submit" class="moveButton" id="moveSignup">회원가입</button>
        </div>
        `
    }
}

export {Login};