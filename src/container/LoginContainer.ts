import {Login} from "../components/auth/Login";
// import {Signup} from "../components/auth/Signup";

class LoginContainer {
    app = document.getElementById("app");
    constructor() {}

    render() {
        this.app.innerHTML = `
        <div class="loginContainerWrapper">
            <div class="loginContainer">
                ${new Login().render()}
            </div>
        </div>
        `
    }
}

export{LoginContainer}