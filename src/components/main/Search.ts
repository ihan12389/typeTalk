import {Component} from "../../lib/Component";
import {firestore} from "../../../Firebase";
import {SearchElement} from "./SearchElement";

class Search extends Component {
    constructor(parent) {
        super(parent);
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
                // 검색 데이터가 있다면 차례대로 렌더링합니다.
                snapshot.docs.map((doc) => {
                    const data = doc.data();
                    document.querySelector(".searchBox").innerHTML += new SearchElement(this, data).render();
                })
            })
        })
    }

    render() {
        return `
        <div class="search">
            <input id="search" type="text" placeholder="🔍 이름(초성), 전화번호 검색" />
            <div class="searchBox">
            </div>
        </div>
        `;
    }
}

export{Search}