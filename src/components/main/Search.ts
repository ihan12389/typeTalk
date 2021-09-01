import {Component} from "../../lib/Component";
import {firestore} from "../../../Firebase";
import {SearchElement} from "./SearchElement";

class Search extends Component {
    me: any;
    constructor(parent, me) {
        super(parent);
        this.me = me;
    }

    mount() {
        // 입력이 발생했을 때
        document.querySelector("#search").addEventListener("input", (event) => {
            var search = (<HTMLInputElement>event.currentTarget).value;
            // 검색창이 비었다면 검색박스를 끕니다
            if (search == "") {
                (<HTMLElement>document.querySelector(".searchBox")).style.display = "none";
                return;
            } else {
                (<HTMLElement>document.querySelector(".searchBox")).style.display = "flex";
            }
            // 데이터베이스에서 사용자를 검색합니다.
            firestore.collection("users").where("nickname", ">=", search).where("nickname", "<=", search + "\uf8ff")
            .get()
            .then((snapshot) => {
                // 검색데이터의 유무를 판단합니다.
                if (snapshot.docs.length === 0) {
                    document.querySelector(".searchBox").innerHTML = `<span>아무 것도 못찾았습니다...ㅜ</span>`
                } else {
                    document.querySelector(".searchBox").innerHTML = ``
                }
                const mountArray = [];
                // 검색 데이터가 있다면 차례대로 렌더링합니다.
                snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const addElement = new SearchElement(this, data, this.me);
                    document.querySelector(".searchBox").innerHTML += addElement.render();
                    mountArray.push(addElement);
                })
                mountArray.map(el => el.mount());
            })
        })
        this.components.map(component => component.mount())
    }

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

export{Search}