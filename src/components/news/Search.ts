import { Component } from "../../lib/Component";
import { firestore } from "../../../Firebase";

class Search extends Component {
  me: any;
  constructor(parent) {
    super(parent);
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

export { Search };
