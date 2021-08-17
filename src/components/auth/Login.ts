class Login {
    app = document.getElementById("app");
    constructor() {}
    render() {
        return `
        <div class="loginLogoContainer">
            <img class="loginLogo" src="images/logo.png" alt="" />
        </div>
        <div class="loginFormContainer">
            <div class="loginInputContainer">
                <input type="text" placeholder="카카오계정 (이메일)" />
                <input type="password" placeholder="비밀번호" />
            </div>
            <button type="button" class="loginButton">로그인</button>
        </div>
        `
    }
}

export {Login};