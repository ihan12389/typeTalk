import { firestore } from "../../../Firebase";
import { Component } from "../../lib/Component";

class Profile extends Component {
  friend: any;
  router: any;
  me: any;
  parent: any;
  friends: any;
  update: any;
  constructor(parent, friend, friends, me, router, update) {
    super(parent);
    this.parent = parent;
    this.friend = friend;
    this.friends = friends;
    this.me = me;
    this.update = update;
    this.router = router;
  }

  mount() {
    /* Delete Friend */
    document
      .getElementById(`delete${this.friend.uid}`)
      .addEventListener("click", (event) => {
        console.log(event);
        console.log((<HTMLElement>event.target).parentElement);

        let newFriends = this.friends.filter(
          (friend) => friend.uid !== this.friend.uid
        );

        this.update(newFriends);
        firestore
          .collection("users")
          .doc(this.me.uid)
          .update({ friends: newFriends });
        firestore
          .collection("users")
          .doc(this.me.uid)
          .collection("friends")
          .doc(this.friend.uid)
          .delete();
      });
  }

  render() {
    return `
        <div class="profile" id="${this.friend.uid}"">
            <div class="profileLeft">
                <img src="${
                  this.friend.profileImg
                }" onError="this.src='./public/images/profile.jpg';" alt="..." />
                <span>${this.friend.nickname}</span>
            </div>
            ${
              this.friend.profileMessage
                ? `<div class="profileMessage"><span>${this.friend.profileMessage}</span></div>`
                : ""
            }
            <span class="deleteFriend" id="delete${this.friend.uid}">❌</span>
        </div>
        `;
  }
}

export { Profile };
