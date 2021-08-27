import { Component } from "../../lib/Component";
import {auth} from "../../../Firebase";


class Login extends Component {
    app = document.getElementById("app");
    
    constructor(parent) {
        super(parent);
    }

    // 로그인 기능
    mount() {
        document.getElementById("loginSubmit").onclick = function() {
            var email = (<HTMLInputElement>document.getElementById('email')).value;
            var password = (<HTMLInputElement>document.getElementById('password')).value;
            console.log(email, password);
            auth.signInWithEmailAndPassword(email, password).then((user) => console.log(user.user)).catch(error => console.log(error.message));
        }
    }
    
    render() {
        return `
        <div class="loginLogoContainer">
            <img class="loginLogo" src="images/logo.png" alt="" />
        </div>
        <div class="loginFormContainer">
                <div class="loginInputContainer">
                    <input type="text" id="email" placeholder="카카오계정 (이메일)" value=""/>
                    <input type="password" id="password" placeholder="비밀번호" value="" />
                </div>
                <button type="submit" class="loginButton" id="loginSubmit">로그인</button>
        </div>
        `
    }
}

export {Login};