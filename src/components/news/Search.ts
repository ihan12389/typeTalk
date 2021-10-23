import { Component } from "../../lib/Component";
import { firestore } from "../../../Firebase";

class Search extends Component {
  me: any;
  searchContents: any;
  constructor(parent, searchContents) {
    super(parent);
    this.searchContents = searchContents;
  }

  mount() {
    document
      .getElementById("newsSearch")
      .addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
          console.log(event);
          const search = (<HTMLInputElement>event.target).value;
          this.searchContents(search);
        }
      });
  }

  render() {
    return `
        <div class="search">
            <input id="newsSearch" type="text" placeholder="🔍 Search Book or Movie Information" value="" />
            <div class="searchBox">
            </div>
        </div>
        <div class="space"> </div>
        `;
  }
}

export { Search };
