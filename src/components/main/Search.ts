import { Component } from "../../lib/Component";
import { firestore } from "../../../Firebase";
import { SearchElement } from "./SearchElement";

class Search extends Component {
  me: any;
  constructor(parent, me) {
    super(parent);
    this.me = me;
  }

  mount() {
    // 검색 이벤트
    document.querySelector("#search").addEventListener("input", (event) => {
      var search = (<HTMLInputElement>event.currentTarget).value;
      var box = <HTMLElement>document.querySelector(".searchBox");

      if (search == "") {
        box.style.display = "none";
        return;
      } else {
        box.style.display = "flex";
      }

      firestore
        .collection("users")
        .where("nickname", ">=", search)
        .where("nickname", "<=", search + "\uf8ff")
        .get()
        .then((snapshot) => {
          this.searchFriend(snapshot);
        });
    });

    this.components.map((component) => component.mount());
  }

  // 파이어스토어 검색
  searchFriend = (snapshot) => {
    if (snapshot.docs.length === 0) {
      document.querySelector(
        ".searchBox"
      ).innerHTML = `<span>Nothing Found...T.T</span>`;
    } else {
      document.querySelector(".searchBox").innerHTML = ``;
    }
    const mountArray = [];
    snapshot.docs.map((doc) => {
      const data = doc.data();
      const addElement = new SearchElement(this, data, this.me);
      document.querySelector(".searchBox").innerHTML += addElement.render();
      mountArray.push(addElement);
    });
    mountArray.map((el) => el.mount());
  };

  render() {
    return `
        <div class="search">
            <input id="search" type="text" placeholder="🔍 Search Nickname & Email" value="" />
            <div class="searchBox">
            </div>
        </div>
        `;
  }
}

export { Search };
