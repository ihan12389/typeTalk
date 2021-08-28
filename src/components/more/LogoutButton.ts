import { Component } from "../../lib/Component";
import {auth} from "../../../Firebase";

class LogoutButton extends Component {
  constructor(parent) {
    super(parent);
  }

  mount() {
      document.querySelector(".logoutButton").addEventListener("click", (event)=>{
          console.log(event)
          auth.signOut();
      })
  }

  render() {
    return `
    <div class="logout">
        <button class="logoutButton">LOGOUT</button>
    </div>
        `;
  }
}

export { LogoutButton };
